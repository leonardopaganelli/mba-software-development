import { Express } from "express";
import { Kafka } from "kafkajs";
import config from "@utils/config";

const { KAFKA_HOST, KAFKA_PORT, KAFKA_DISABLED } = config;

async function kafka(app: Express) {
  if (!!KAFKA_DISABLED && KAFKA_DISABLED === "true") return;

  const kafkaInstance = new Kafka({
    clientId: "jusbrasil-service",
    brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
  });
  const producer = kafkaInstance.producer();

  app.use((req, _res, next) => {
    req.producer = producer;

    return next();
  });

  await producer.connect();
  console.log("kafka connected");
}

export default kafka;
