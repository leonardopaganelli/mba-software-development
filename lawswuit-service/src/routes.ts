import { Express, Request, Response } from "express";

const routes = (app: Express) => {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (_: Request, res: Response) => res.sendStatus(200));

  app.post("lawsuit", async (req, res) => res.status(500).send("Not implemented"));
  app.get("lawsuit", async (req, res) => res.status(500).send("Not implemented"));
  app.get("lawsuit/:id", async (req, res) => res.status(500).send("Not implemented"));

  app.get("user", async (req, res) => res.status(500).send("Not implemented"));
  app.post("user", async (req, res) => res.status(500).send("Not implemented"));
  app.get("user/:id", async (req, res) => res.status(500).send("Not implemented"));
  app.put("user/:id", async (req, res) => res.status(500).send("Not implemented"));
  app.delete("user/:id", async (req, res) => res.status(500).send("Not implemented"));

  app.get("user/:id/lawsuit", async (req, res) => res.status(500).send("Not implemented"));
  app.post("user/:id/lawsuit", async (req, res) => res.status(500).send("Not implemented"));
}

export default routes;
