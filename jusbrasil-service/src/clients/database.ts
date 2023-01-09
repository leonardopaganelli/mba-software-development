import { Options, Sequelize } from "sequelize";

import config from "@utils/config";

export const databaseConfig: Options = {
  dialect: "postgres",
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: config.DB_PORT as number,
  define: {
    underscored: true,
    createdAt: false,
    updatedAt: false
  },
};

const database = new Sequelize(databaseConfig);
async function connect() {
  try {
    await database.authenticate();
    console.log("Connection with database been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export {
  database,
  connect
};

