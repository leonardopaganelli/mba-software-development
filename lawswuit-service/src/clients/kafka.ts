import { Kafka } from "kafkajs";
import config from "@utils/config";

const { KAFKA_HOST, KAFKA_PORT } = config;

async function kafka() {
  const kafkaInstance = new Kafka({
    clientId: "lawsuit-service",
    brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
  });

  const topic = "lawsuit-update";
  const consumer = kafkaInstance.consumer({ groupId: "lawsuit-service" });

  await consumer.connect();
  console.log("Consumer connected");

  consumer.subscribe({ topic });
  consumer.run({
    eachMessage: async({ topic, partition, message}) =>{
      console.log("NEW MESSAGE: ",{topic, partition, message});
    }
  })
}

export default kafka;
