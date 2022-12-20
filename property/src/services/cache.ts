// @ts-nocheck

import mongoose from "mongoose";
import { createClient } from "redis";
import util from "util";

const exec = mongoose.Query.prototype.exec;
const REDIS_URL = "redis://redis-caching-srv:6379";
console.log(REDIS_URL);

const client = createClient({
  legacyMode: true,
  url: REDIS_URL,
});

(async () => {
  try {
    await client.connect();
    console.log("Redis Caching Layer Server Is ON");
  } catch (error) {
    console.log("Redis Caching not working");
  }
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
  const cacheValue = await client.hget(this.hashKey, key);

  if (cacheValue) {
    console.log("from cache");
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
  const result = await exec.apply(this);
  console.log("from DB");
  client.hset(this.hashKey, key, JSON.stringify(result), "EX", 10);
  return result;
};

export default {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
