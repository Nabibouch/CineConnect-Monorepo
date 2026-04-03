import express from "express";
import {
  addCategory,
  deleteOneCategory,
  getAllCategories,
  getOneCategory,
  updateOneCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Créer une catégorie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreateRequest'
 *     responses:
 *       '201':
 *         description: Catégorie créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *               required: [message, category]
 *   get:
 *     tags: [Categories]
 *     summary: Lister les catégories
 *     responses:
 *       '200':
 *         description: Liste de catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Récupérer une catégorie par id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Catégorie trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *               required: [category]
 *   put:
 *     tags: [Categories]
 *     summary: Mettre à jour une catégorie
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
 *             type: object
 *             properties:
 *               name: { type: string }
 *             additionalProperties: false
 *     responses:
 *       '200':
 *         description: Catégorie mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *               required: [message, category]
 *   delete:
 *     tags: [Categories]
 *     summary: Supprimer une catégorie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Catégorie supprimée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *               required: [message, category]
 */

router.post("/", addCategory);
router.get("/", getAllCategories);
router.get("/:id", getOneCategory);
router.put("/:id", updateOneCategory);
router.delete("/:id", deleteOneCategory);

export default router;
