import express from "express";
import {
  addFilm,
  addCategoryToFilm,
  deleteCategoryFromFilm,
  deleteOneFilm,
  getAllFilms,
  getOneFilm,
  updateOneFilm,
} from "../controllers/films.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/films:
 *   post:
 *     tags: [Films]
 *     summary: Créer un film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmCreateRequest'
 *     responses:
 *       '201':
 *         description: Film créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 film:
 *                   $ref: '#/components/schemas/Film'
 *               required: [message, film]
 *       '400':
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     tags: [Films]
 *     summary: Récupérer tous les films
 *     responses:
 *       '200':
 *         description: Liste de films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 */

/**
 * @openapi
 * /api/films/{id}:
 *   get:
 *     tags: [Films]
 *     summary: Récupérer un film par id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Film trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *   put:
 *     tags: [Films]
 *     summary: Mettre à jour un film
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
 *             $ref: '#/components/schemas/FilmUpdateRequest'
 *     responses:
 *       '200':
 *         description: Film mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 film:
 *                   $ref: '#/components/schemas/Film'
 *               required: [message, film]
 *   delete:
 *     tags: [Films]
 *     summary: Supprimer un film
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Film supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 film:
 *                   $ref: '#/components/schemas/Film'
 *               required: [message, film]
 */

/**
 * @openapi
 * /api/films/{id}/categories:
 *   post:
 *     tags: [Films]
 *     summary: Ajouter une catégorie à un film
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
 *             $ref: '#/components/schemas/AddCategoryToFilmRequest'
 *     responses:
 *       '200':
 *         description: Catégorie ajoutée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 film:
 *                   $ref: '#/components/schemas/Film'
 *               required: [message, film]
 *       '400':
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/films/{id}/categories/{category}:
 *   delete:
 *     tags: [Films]
 *     summary: Supprimer une catégorie depuis un film
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
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
 *                 film:
 *                   $ref: '#/components/schemas/Film'
 *               required: [message, film]
 */


router.post("/", addFilm);
router.get("/", getAllFilms);
router.post("/:id/categories", addCategoryToFilm);
router.delete("/:id/categories/:category", deleteCategoryFromFilm);
router.put("/:id", updateOneFilm);
router.delete("/:id", deleteOneFilm);
router.get("/:id", getOneFilm);

export default router;
