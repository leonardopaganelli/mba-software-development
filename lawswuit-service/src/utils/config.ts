import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("./", `.env.${process.env.NODE_ENV}`),
});

export default {
  NODE_ENV: process.env.NODE_ENV,
  KAFKA_HOST: process.env.KAFKA_HOST,
  KAFKA_PORT: process.env.KAFKA_PORT,
};
