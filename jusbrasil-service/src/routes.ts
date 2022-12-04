import { Express, Request, Response } from "express";
import { ReadLawsuitByIdInput } from "@schemas/lawsuit";

import { findAllCourts, findOneCourt } from "./service/court.service";
import { findAllLawsuits, findOneLawsuit } from "./service/lawsuit.service";

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

  app.get("/lawsuit", async ({ params: {}}, res) => {
    try {
      const lawsuits = await findAllLawsuits();
      res.status(200).send(`${JSON.stringify(lawsuits, null, 2)}`);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });
  app.get(
    "/lawsuit/:lawsuitId",
    async (req: Request<ReadLawsuitByIdInput["params"]>, res) => {
      try {
        const {
          params: { lawsuitId },
        } = req;

        const lawsuit = await findOneLawsuit(lawsuitId);

        if (!lawsuit) {
          res.sendStatus(404);
        }

        res.status(200).send(`${JSON.stringify(lawsuit, null, 2)}`);
      } catch (e) {
        console.error(e);
        res.sendStatus(500);
      }
    }
  );
  app.post("/lawsuit", async (req, res) =>
    res.status(500).send("Not implemented")
  );
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

  app.get("/court", async (_: Request, res: Response) => {
    try {
      const courts = await findAllCourts();
      res.status(200).send(`${JSON.stringify(courts, null, 2)}`);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.get("/court/:id", async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const court = await findOneCourt(Number(id));

      if (!court) {
        res.sendStatus(404);
      }

      res.status(200).send(`${JSON.stringify(court, null, 2)}`);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.get("*", function (req, res) {
    res.send(404);
  });
}

export default routes;
