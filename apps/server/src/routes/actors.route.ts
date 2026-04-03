import { Router } from "express";
import { addActor, getAllActors, getOneActor } from "../controllers/actors.controller.js";

const router = Router();

/**
 * @openapi
 * /api/actors:
 *   post:
 *     tags: [Actors]
 *     summary: Ajouter un acteur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActorCreateRequest'
 *     responses:
 *       '201':
 *         description: Acteur ajouté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 actor:
 *                   $ref: '#/components/schemas/Actor'
 *               required: [message, actor]
 *       '400':
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     tags: [Actors]
 *     summary: Lister les acteurs
 *     responses:
 *       '200':
 *         description: Liste d'acteurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 */

/**
 * @openapi
 * /api/actors/{id}:
 *   get:
 *     tags: [Actors]
 *     summary: Récupérer un acteur par id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Acteur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       '400':
 *         description: Erreur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post("/", addActor);   // utilisé par le seeder
router.get("/", getAllActors);
router.get("/:id", getOneActor); // utilisé par le front

export default router;