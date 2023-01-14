import express from "express";
import routes from "./routes";
import swaggerDocs from "@utils/swagger";
import config from "@utils/config";
import kafka  from "@clients/kafka";
import { connect as databaseConnect } from "@clients/database";
import cors from "cors";

console.log("Initializing with config", config);

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: ["http://localhost:8081", "http://localhost:8080"],
  preflightContinue: false,
};

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors(options));

async function run() {
  await kafka(app);
  await databaseConnect();

  app.listen(port, async () => {
    console.log(`Server running on port http://127.0.0.1:${port}`);
    routes(app);
    swaggerDocs(app, port);
  });
}

run().catch(console.error);
