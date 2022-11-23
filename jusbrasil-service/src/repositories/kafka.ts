import { Express } from "express";
import { Kafka, KafkaConfig, Producer } from "kafkajs";
import config from "@utils/config";

const { KAFKA_HOST, KAFKA_PORT } = config;

async function kafka(app: Express) {
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
  console.log("kafka connected")
}

export default kafka;
