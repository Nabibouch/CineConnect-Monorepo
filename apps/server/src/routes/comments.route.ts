import express from "express";
import {
  addComment,
  deleteOneComment,
  getAllComments,
  getOneComment,
  updateOneComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Créer un commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentCreateRequest'
 *     responses:
 *       '201':
 *         description: Commentaire créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 commentaire:
 *                   $ref: '#/components/schemas/Comment'
 *               required: [message, commentaire]
 *   get:
 *     tags: [Comments]
 *     summary: Lister les commentaires
 *     responses:
 *       '200':
 *         description: Liste de commentaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

/**
 * @openapi
 * /api/comments/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: Récupérer un commentaire par id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Commentaire trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *               required: [message, comment]
 *   put:
 *     tags: [Comments]
 *     summary: Mettre à jour un commentaire
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
 *             $ref: '#/components/schemas/CommentUpdateRequest'
 *     responses:
 *       '200':
 *         description: Commentaire mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 commentaire:
 *                   $ref: '#/components/schemas/Comment'
 *               required: [message, commentaire]
 *   delete:
 *     tags: [Comments]
 *     summary: Supprimer un commentaire
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Commentaire supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 commentaire:
 *                   $ref: '#/components/schemas/Comment'
 *               required: [message, commentaire]
 */

router.post("/", addComment);
router.get("/", getAllComments);
router.get("/:id", getOneComment);
router.put("/:id", updateOneComment);
router.delete("/:id", deleteOneComment);

export default router;
