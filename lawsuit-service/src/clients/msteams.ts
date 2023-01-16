import axios from "axios";

function sendMessage(message: string) {
  const payload = formatPayload(message);
  const url = process.env.WEBHOOK as string;
  axios
    .post(url, payload)
    .then(() => {
      console.log("Mensagem enviada ao teams!");
    })
    .catch((error) => {
      console.log("Erro ao enviar mensagem ao teams", error);
    });
}

function formatPayload(message: string) {
  const channel = process.env.CHANNEL as string;
  const payload = {
    channel,
    username: "lawsuit-app",
    text: message,
  };
  return JSON.stringify(payload);
}

export { sendMessage }

