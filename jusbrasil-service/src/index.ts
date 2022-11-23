import express from "express";
import routes from "./routes";
import swaggerDocs from "@utils/swagger";
import config from "@utils/config";
import kafka  from "@repositories/kafka";

const port = 3001;
const app = express();

console.log("Initializing with config", config);

async function run() {
  await kafka(app);

  app.listen(port, async () => {
    console.log(`Server running on port http://127.0.0.1:${port}`);
    routes(app);
    swaggerDocs(app, port);
  });
}

run().catch(console.error);
