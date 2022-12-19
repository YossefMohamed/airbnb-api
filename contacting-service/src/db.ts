import { Sequelize } from "sequelize";

const dbConfig = {
  HOST: process.env.DB_HOST!,
  USER: process.env.DB_USER!,
  PASSWORD: process.env.DB_PASSWORD!,
  DB: process.env.DB_NAME!,
  port: process.env.DB_PORT!,
  dialect: "mysql",
};

export const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: Number(dbConfig.port),
  dialect: "mysql",
});

export const connectToDB = async () => {
  try {
    db.sync()
      .then(() => {
        console.log("Synced db.");
      })
      .catch((err) => {
        console.log("Failed to sync db: " + err.message);
      });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
