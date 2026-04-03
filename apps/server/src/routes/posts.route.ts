import express from "express";
import {
  addPost,
  deleteOnePost,
  getAllPosts,
  getOnePost,
  updateOnePost,
} from "../controllers/posts.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/posts:
 *   post:
 *     tags: [Posts]
 *     summary: Créer un post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreateRequest'
 *     responses:
 *       '201':
 *         description: Post créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *               required: [message, post]
 *   get:
 *     tags: [Posts]
 *     summary: Lister les posts
 *     responses:
 *       '200':
 *         description: Liste de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */

/**
 * @openapi
 * /api/posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Récupérer un post par id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Post trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *   put:
 *     tags: [Posts]
 *     summary: Mettre à jour un post
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
 *             $ref: '#/components/schemas/PostUpdateRequest'
 *     responses:
 *       '200':
 *         description: Post mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedPost:
 *                   $ref: '#/components/schemas/Post'
 *               required: [message, updatedPost]
 *   delete:
 *     tags: [Posts]
 *     summary: Supprimer un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Post supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *               required: [message, post]
 */

router.post("/", addPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id", updateOnePost);
router.delete("/:id", deleteOnePost);

export default router;
