// @ts-nocheck

import mongoose from "mongoose";
import { createClient } from "redis";
import util from "util";

const exec = mongoose.Query.prototype.exec;
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const client = createClient({
  legacyMode: true,
  url: REDIS_URL,
});

(async () => {
  await client.connect();
  console.log("Redis Caching Layer Server Is ON");
})();

client.hget = util.promisify(client.hget);

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  //redis functionality
  // key { query "id" , collection "users"}
  if (!this.useCache) return await exec.apply(this);

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collation: this.mongooseCollection.name,
    })
  );
  // check the key in redis
  const cacheValue = await client.hget(JSON.stringify(this.hashKey), key);

  if (cacheValue) {
    console.log("from cache");
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
  const result = await exec.apply(this);
  console.log("from DB");

  client.hset(
    JSON.stringify(this.hashKey),
    key,
    JSON.stringify(result),
    "EX",
    1000
  );
  return result;
};

export default {
  clearHash(hashKey) {
    console.log(hashKey, "deleted");
    client.del(hashKey);
  },
};
