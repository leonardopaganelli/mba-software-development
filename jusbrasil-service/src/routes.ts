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

  app.get("/test", (req, res) => {
    res.status(200).send("Hello World JusBrasil");
  });
}

export default routes;
