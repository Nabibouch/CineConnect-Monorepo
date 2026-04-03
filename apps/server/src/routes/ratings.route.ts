import express from "express";
import {
  addRating,
  getAllRatings,
  updateOneRating,
  deleteOneRating,
  getOneRating
}
from "../controllers/ratings.controller.js"

const router = express.Router();

/**
 * @openapi
 * /api/ratings:
 *   post:
 *     tags: [Ratings]
 *     summary: Ajouter une note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RatingCreateRequest'
 *     responses:
 *       '201':
 *         description: Note ajoutée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 note:
 *                   type: integer
 *               required: [message, note]
 *   get:
 *     tags: [Ratings]
 *     summary: Lister toutes les notes
 *     responses:
 *       '200':
 *         description: Liste des ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allRatings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Rating'
 *               required: [allRatings]
 */

/**
 * @openapi
 * /api/ratings/{id}:
 *   put:
 *     tags: [Ratings]
 *     summary: Mettre à jour une note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RatingUpdateRequest'
 *     responses:
 *       '200':
 *         description: Note mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 note:
 *                   $ref: '#/components/schemas/Rating'
 *               required: [message, note]
 *   delete:
 *     tags: [Ratings]
 *     summary: Supprimer une note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Note supprimée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 note:
 *                   $ref: '#/components/schemas/Rating'
 *               required: [message, note]
 *   get:
 *     tags: [Ratings]
 *     summary: Récupérer une note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Rating trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rating:
 *                   $ref: '#/components/schemas/Rating'
 *               required: [rating]
 */

router.post("/", addRating);
router.get("/", getAllRatings);
router.put("/:id", updateOneRating);
router.delete("/:id", deleteOneRating);
router.get("/:id", getOneRating);

export default router;
