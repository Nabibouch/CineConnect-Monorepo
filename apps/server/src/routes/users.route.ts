import express from "express";
import {
  deleteOneUser,
  getAllUsers,
  getFollowCounts,
  getFollowStatus,
  followUser,
  getOneUser,
  signIn,
  signUp,
  unfollowUser,
  updateOneUser,
  getMe,
  logOut
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/users/signup:
 *   post:
 *     tags: [Users]
 *     summary: Inscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       '201':
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *               required: [message, user]
 *       '400':
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/users/signin:
 *   post:
 *     tags: [Users]
 *     summary: Connexion (cookie `token`)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       '200':
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *               required: [message, user]
 *       '400':
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Récupérer le profil connecté
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Profil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *               required: [user]
 *       '401':
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/users/logout:
 *   post:
 *     tags: [Users]
 *     summary: Déconnexion
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required: [message]
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Lister les utilisateurs
 *     responses:
 *       '200':
 *         description: Liste d'utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listOfUsers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserPublic'
 *               required: [listOfUsers]
 */

/**
 * @openapi
 * /api/users/{id}/follow-status/{followerId}:
 *   get:
 *     tags: [Users]
 *     summary: Vérifier si `followerId` suit `id`
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: followerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Statut de follow
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isFollowing:
 *                   type: boolean
 *               required: [isFollowing]
 */

/**
 * @openapi
 * /api/users/{id}/follow-counts:
 *   get:
 *     tags: [Users]
 *     summary: Compter les followers et following
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Comptes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 followers:
 *                   type: integer
 *                 following:
 *                   type: integer
 *               required: [followers, following]
 */

/**
 * @openapi
 * /api/users/{id}/follow:
 *   post:
 *     tags: [Users]
 *     summary: Suivre un utilisateur
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
 *             $ref: '#/components/schemas/FollowRequest'
 *     responses:
 *       '200':
 *         description: Follow mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 alreadyFollowing:
 *                   type: boolean
 *               required: [message, alreadyFollowing]
 *   delete:
 *     tags: [Users]
 *     summary: Ne plus suivre un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Unfollow
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required: [message]
 */

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Récupérer un utilisateur par id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *               required: [user]
 *   put:
 *     tags: [Users]
 *     summary: Mettre à jour un utilisateur
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
 *               username: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string }
 *               avatar_url: { type: string, nullable: true }
 *               bio: { type: string, nullable: true }
 *             additionalProperties: true
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *               required: [message, user]
 *   delete:
 *     tags: [Users]
 *     summary: Supprimer un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Utilisateur supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *               required: [message, user]
 */


//routes fixes
router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logOut);
router.get("/", getAllUsers);
router.get("/:id/follow-status/:followerId", getFollowStatus);
router.get("/:id/follow-counts", getFollowCounts);
router.post("/:id/follow", followUser);
router.delete("/:id/follow", unfollowUser);

//routes dynamiques
router.get("/:id", getOneUser);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);
export default router;