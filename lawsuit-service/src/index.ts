import kafka from "@clients/kafka";
import { httpServer, io } from "@clients/socket";
import { sendMessage } from "@clients/msteams";

const port = 3000;

io.on("connection", (socket) => {
  console.log("Someone connected!");

  socket.on("teams-message", () => {
    console.log("Someone example!");
    sendMessage("Mensagem funcionando com sucesso");
  });
});

async function run() {
  await kafka();

  httpServer.listen(port, () => {
    console.log(`Server running on port http://127.0.0.1:${port}`);
    // routes(app);
    // swaggerDocs(app, port);
  });
}

run().catch(console.error);
