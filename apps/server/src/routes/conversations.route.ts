// src/routes/conversations.route.ts
import express from "express";
import {
  createConversation,
  addMember,
  getUserConversations,
} from "../controllers/conversations.controller.js";

const router = express.Router();

/**
 * @openapi
 * /conversations:
 *   post:
 *     tags: [Conversations]
 *     summary: Créer une conversation (au moins 2 membres)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateConversationRequest'
 *     responses:
 *       '201':
 *         description: Conversation créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       '400':
 *         description: Erreur serveur/validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /conversations/{id}/members:
 *   post:
 *     tags: [Conversations]
 *     summary: Ajouter un membre à une conversation
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
 *             $ref: '#/components/schemas/AddConversationMemberRequest'
 *     responses:
 *       '201':
 *         description: Membre ajouté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 conversation_id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *               required: [id, conversation_id, user_id]
 */

/**
 * @openapi
 * /conversations/user/{userId}:
 *   get:
 *     tags: [Conversations]
 *     summary: Lister les conversations d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Liste des conversations (par id)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   conversation_id:
 *                     type: integer
 *                 required: [conversation_id]
 */

router.post("/", createConversation);
router.post("/:id/members", addMember);
router.get("/user/:userId", getUserConversations);

export default router;
//