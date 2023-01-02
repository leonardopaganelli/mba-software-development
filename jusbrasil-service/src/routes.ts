import { Express, Request, Response } from "express";
import { ReadLawsuitByIdInput } from "@schemas/lawsuit";

import { findAllCourts, findOneCourt } from "./service/court.service";
import { findAllLawsuits, findOneLawsuit } from "./service/lawsuit.service";
import { addDocument } from "./service/document.service";

const routes = (app: Express) => {
  /**
   * @openapi
   * components:
   *   schemas:
   *     Court:
   *       type: object
   *       properties:
   *         id:
   *           type: number
   *         name:
   *           type: string
   *         alias:
   *           type: string
   *         city:
   *           type: string
   *         state:
   *           type: string
   *       example:
   *         id: 1
   *         name: 'Tribunal de Justiça do Espírito Santo"'
   *         alias: 'TJES'
   *         city: 'Vitória'
   *         state: 'Espírito Santo'
   *     Lawyer:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         name:
   *           type: string
   *       example:
   *         id: 'OAB 6739/ES'
   *         name: 'Jerize Terciano de Almeida'
   *     Involved:
   *       type: object
   *       properties:
   *         lawsuit_id:
   *           type: string
   *         perpetrator:
   *           type: string
   *         acused:
   *           type: string
   *         plaintif_lawyer_id:
   *           type: string
   *         defendant_lawyer_id:
   *           type: string
   *         LawsuitId:
   *           type: string
   *         plaintifLawyer:
   *           $ref: '#/components/schemas/Lawyer'
   *         defendantLayer:
   *           $ref: '#/components/schemas/Lawyer'
   *     LawsuitComplete:
   *        type: object
   *        properties:
   *         id:
   *           type: string
   *         nature:
   *           type: string
   *         judicialBranch:
   *           type: string
   *         initDate:
   *           type: string
   *         amountInControversy:
   *           type: string
   *         court_id:
   *           type: number
   *     LawsuitAbridged:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         nature:
   *           type: string
   *         judicialBranch:
   *           type: string
   *         initDate:
   *           type: string
   *         amountInControversy:
   *           type: string
   *         court_id:
   *           type: number
   *         Involved:
   *           type: object
   *           properties:
   *             acused: string
   *       example:
   *         id: "502XXXX-21.2021.8.08.0024"
   *         nature: "Procedimento do juizado especial cível"
   *         judicialBranch: "Justiça dos Estados e do Distrito Federal e Territórios"
   *         initDate: "2021-10-29"
   *         amountInControversy: "3000"
   *         court_id: 1
   *         Involved: {
   *           acused: "Banco do Brasil"
   *         }
   *     Lawsuits:
   *       type: array
   *       items:
   *         $ref: '#/components/schemas/LawsuitAbridged'
   */

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *      - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (_: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * /lawsuit:
   *   get:
   *     tags:
   *      - Lawsuit
   *     summary: Responds all lawsuits on database
   *     responses:
   *       200:
   *         description: Lawsuit list abridged
   *         content:
   *           application/json:
   *             schema:
   *                 $ref: '#/components/schemas/Lawsuits'
   */
  app.get("/lawsuit", async (_: Request, res: Response) => {
    try {
      const lawsuits = await findAllLawsuits();
      res.status(200).send(`${JSON.stringify(lawsuits, null, 2)}`);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  /**
   * @openapi
   * /lawsuit/:lawsuitId:
   *   get:
   *     tags:
   *      - Lawsuit
   *     summary: Responds lawsuit detailed
   *     responses:
   *       200:
   *         description: Lawsuit complete
   *         content:
   *           application/json:
   *             schema:
   *                 $ref: '#/components/schemas/LawsuitComplete'
   */
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

  app.post("/document", async (req, res) => {
    try {
      await addDocument(req.body);
      await req.producer.send({
        topic: "lawsuit-update",
        messages: [{ value: JSON.stringify(req.body) }],
      });

      res
        .status(200)
        .send(`Mensagem enviada com sucesso: ${JSON.stringify(req.body)}`);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  /**
   * @openapi
   * /court:
   *   get:
   *     tags:
   *      - Lawsuit
   *     summary: Responds all courts on database
   *     responses:
   *       200:
   *         description: Court list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Court'
   */
  app.get("/court", async (_: Request, res: Response) => {
    try {
      const courts = await findAllCourts();
      res.status(200).send(`${JSON.stringify(courts, null, 2)}`);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  /**
   * @openapi
   * /court/:courtId:
   *   get:
   *     tags:
   *      - Lawsuit
   *     summary: Responds court on database
   *     responses:
   *       200:
   *         description: Court
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Court'
   */
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

  // app.get("*", function (req, res) {
  //   res.send(404);
  // });
}

export default routes;
