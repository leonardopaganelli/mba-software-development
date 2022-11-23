import { Express, Request, Response } from "express";
import { ReadLawsuitByIdInput } from "@schemas/lawsuit";

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

  app.get("/lawsuit", async ({ params: {}}, res) => res.status(500).send("Not implemented"));
  app.get(
    "/lawsuit/:lawsuitId",
    async (req: Request<ReadLawsuitByIdInput["params"]>, res) => {
      console.log("req.params", req.params);
      res.status(200).send(`Lawsuit`);
    }
  );
  app.post("/lawsuit", async(req, res) => res.status(500).send("Not implemented"));
  app.put("/lawsuit/:lawsuitId", async (req, res) =>
    res.status(500).send("Not implemented")
  );
  app.delete("/lawsuit/:lawsuitId", async (req, res) =>
    res.status(500).send("Not implemented")
  );

  app.patch("/lawsuit/:lawsuitId/new-event", async (req, res) => {
    const { params : { lawsuitId }} = req;
    const message = {
      lawsuitId,
      date: "2022",
      document: {
        status: "Andamento",
        description: "Expedição de Certidão.",
      },
    };

    await req.producer.send({
      topic: "lawsuit-update",
      messages: [{ value: JSON.stringify(message) }],
    });
    res
      .status(200)
      .send(`Mensagem enviada com sucesso: ${JSON.stringify(message)}`);
  });

  app.get("*", function (req, res) {
    res.send(404);
  });
}

export default routes;
