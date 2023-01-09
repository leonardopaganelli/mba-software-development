import { Express, Request, Response } from "express";

import { findAllCourts, findOneCourt } from "./service/court.service";
import {
  findAllLawsuits,
  findOneLawsuit,
  addLawsuit,
  removeLawsuit,
  updateLawsuit,
} from "./service/lawsuit.service";
import { addDocument } from "./service/document.service";

const routes = (app: Express) => {
  /**
   * @openapi
   * components:
   *   schemas:
   *     InputCreateLawsuit:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         nature:
   *           type: string
   *         judicialBranch:
   *           type: string
   *         initDate:
   *           type: date
   *         amountInControversy:
   *           type: number
   *         courtId:
   *           type: number
   *         involved:
   *           type: object
   *           properties:
   *             perpetrator:
   *               type: string
   *             acused:
   *               type: string
   *             plaintifLawyerId:
   *               type: string
   *             defendantLawyerId:
   *               type: string
   *         subjects:
   *           type: array
   *           items:
   *             type: string
   *       example:
   *         id: "502XXXX-21.2021.8.08.0025"
   *         nature: "Procedimento do juizado especial cível"
   *         judicialBranch: "Justiça dos Estados e do Distrito Federal e Territórios"
   *         initDate: "2023-01-01"
   *         amountInControversy: 5000
   *         courtId: 1
   *         involved: {
   *           perpetrator: "Nova pessoa",
   *           acused: "Novo banco",
   *           plaintifLawyerId: "OAB 6739/ES",
   *           defendantLawyerId: "OAB 7716/MG"
   *         }
   *         subjects: [
   *           "1"
   *         ]
   *
   *     InputUpdateLawsuit:
   *       type: object
   *       properties:
   *         nature:
   *           type: string
   *         judicialBranch:
   *           type: string
   *         amountInControversy:
   *           type: number
   *       example:
   *         nature: "Procedimento do juizado especial cível"
   *         judicialBranch: "Justiça dos Estados e do Distrito Federal e Territórios"
   *         amountInControversy: 5000
   *     InputDocument:
   *       type: object
   *       properties:
   *         lawsuitId:
   *           type: string
   *         date:
   *           type: string
   *         description:
   *           type: string
   *         status:
   *           type: string
   *       example:
   *         lawsuitId: "502XXXX-21.2021.8.08.0024"
   *         date: "2022-08-14"
   *         description: "Expedição de Certidão"
   *         status: "Em Andamento"
   *     Document:
   *       type: object
   *       properties:
   *         event_id:
   *           type: number
   *         label:
   *           type: string
   *         description:
   *           type: string
   *         created_at:
   *           type: string
   *       example:
   *         event_id: 1
   *         label: "Andamento"
   *         description: 'Expedição de Certidão'
   *         created_at: '2022-12-01'
   *     Event:
   *       type: object
   *       properties:
   *         date:
   *           type: string
   *         documents:
   *           type: array
   *           items:
   *             $ref: '#/components/schemas/Document'
   *     Subject:
   *       type: object
   *       properties:
   *         id:
   *           type: number
   *         name:
   *           type: string
   *       example:
   *         id: 1
   *         name: 'Responsabilidade Civil'
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
   *         name: 'Tribunal de Justiça do Espírito Santo'
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
   *         perpetrator:
   *           type: string
   *         acused:
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
   *         Court:
   *           $ref: '#/components/schemas/Court'
   *         Involved:
   *           $ref: '#/components/schemas/Involved'
   *         subjects:
   *           type: array
   *           items:
   *             $ref: '#/components/schemas/Subject'
   *         events:
   *           type: array
   *           items:
   *             $ref: '#/components/schemas/Event'
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
   *         courtId:
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
   *         courtId: 1
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
   *       500:
   *         description: Error on get Lawsuits
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
   * /lawsuit:
   *   post:
   *     tags:
   *      - Lawsuit
   *     summary: Add new Lawsuit
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/InputCreateLawsuit'
   *     responses:
   *       201:
   *         description: Lawsuit Added
   *       500:
   *         description: Error on add Lawsuit
   */
  app.post("/lawsuit", async (req, res) => {
    try {
      await addLawsuit(req.body);

      res.status(201).send("Processo criado com sucesso");
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  /**
   * @openapi
   * /lawsuit/{lawsuitId}:
   *   get:
   *     tags:
   *      - Lawsuit
   *     summary: Responds lawsuit detailed
   *     parameters:
   *       - in: path
   *         name: lawsuitId
   *         schema:
   *           type: string
   *           example: "502XXXX-21.2021.8.08.0024"
   *         required: true
   *         description: Lawsuit Id
   *     responses:
   *       200:
   *         description: Lawsuit complete
   *         content:
   *           application/json:
   *             schema:
   *                 $ref: '#/components/schemas/LawsuitComplete'
   *       404:
   *         description: Lawsuit not found
   *       500:
   *         description: Error on get Lawsuit
   */
  app.get("/lawsuit/:lawsuitId", async (req, res) => {
    try {
      const {
        params: { lawsuitId },
      } = req;

      const lawsuit = await findOneLawsuit(lawsuitId);

      lawsuit
        ? res.status(200).send(`${JSON.stringify(lawsuit, null, 2)}`)
        : res.sendStatus(404);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  /**
   * @openapi
   * /lawsuit/{lawsuitId}:
   *   put:
   *     tags:
   *      - Lawsuit
   *     summary: Update lawsuit
   *     parameters:
   *       - in: path
   *         name: lawsuitId
   *         schema:
   *           type: string
   *           example: "502XXXX-21.2021.8.08.0024"
   *         required: true
   *         description: Lawsuit Id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/InputUpdateLawsuit'
   *     responses:
   *       200:
   *         description: Lawsuit updated
   *       404:
   *         description: Lawsuit not found
   *       500:
   *         description: Error on update Lawsuit
   */
  app.put("/lawsuit/:lawsuitId", async (req, res) => {
    try {
      const {
        params: { lawsuitId },
      } = req;

      await updateLawsuit(lawsuitId, req.body);
      res.status(200).send("Processo atualizado com sucesso");
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  /**
   * @openapi
   * /lawsuit/{lawsuitId}:
   *   delete:
   *     tags:
   *      - Lawsuit
   *     summary: Delete Lawsuit
   *     parameters:
   *       - in: path
   *         name: lawsuitId
   *         schema:
   *           type: string
   *           example: "502XXXX-21.2021.8.08.0025"
   *         required: true
   *         description: Lawsuit Id
   *     responses:
   *       200:
   *         description: Lawsuit deleted
   *       500:
   *         description: Error on delete Lawsuit
   */
  app.delete("/lawsuit/:lawsuitId", async (req, res) => {
    try {
      const {
        params: { lawsuitId },
      } = req;

      await removeLawsuit(lawsuitId);

      res.status(200).send("Processo deletado com sucesso");
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  /**
   * @openapi
   * /document:
   *   post:
   *     tags:
   *      - Lawsuit
   *     summary: Add new document to lawsuit timeline
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/InputDocument'
   *     responses:
   *       201:
   *         description: Document Added
   *       500:
   *         description: Error on add document
   */
  app.post("/document", async (req, res) => {
    try {
      await addDocument(req.body);
      if (req.producer) {
        await req.producer.send({
          topic: "lawsuit-update",
          messages: [{ value: JSON.stringify(req.body) }],
        });
        console.log(
          `Mensagem enviada com sucesso: ${JSON.stringify(req.body)}`
        );
      }

      res.status(201).send("Documento criado com sucesso");
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
   *       500:
   *         description: Error on get courts
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
   * /court/{courtId}:
   *   get:
   *     tags:
   *      - Lawsuit
   *     summary: Responds court on database
   *     parameters:
   *       - in: path
   *         name: courtId
   *         schema:
   *           type: string
   *           example: "1"
   *         required: true
   *         description: Court Id
   *     responses:
   *       200:
   *         description: Court
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Court'
   *       404:
   *         description: Court not found
   *       500:
   *         description: Error on get court
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
}

export default routes;
