import express from "express";
import routes from "./routes";
import swaggerDocs from '@utils/swagger.js';
import kafka from '@repositories/kafka';

const port = 3000;
const app = express();

async function run() {
  await kafka();

  app.listen(port, async () => {
    console.log(`Server running on port http://127.0.0.1:${port}`);
    routes(app);
    swaggerDocs(app, port);
  });
}

run().catch(console.error);