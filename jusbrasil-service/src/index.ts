import express from "express";
import routes from "./routes";
import swaggerDocs from '@utils/swagger.js';

const port = 3001;
const app = express();

app.listen(port, () => {
  console.log(`Server running on port http://127.0.0.1:${port}`);
  routes(app);
  swaggerDocs(app, port);
});
