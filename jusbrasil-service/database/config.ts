/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
let path = require("path");

require("dotenv").config({
  path: path.resolve("./", `.env.${process.env.NODE_ENV || "local"}`),
});

module.exports = {
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  define: {
    underscored: true,
    createdAt: false,
    updatedAt: false,
  },
  seederStorage: "sequelize",
};
