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

router.post("/", addFilm);
router.get("/", getAllFilms);
router.post("/:id/categories", addCategoryToFilm);
router.delete("/:id/categories/:category", deleteCategoryFromFilm);
router.put("/:id", updateOneFilm);
router.delete("/:id", deleteOneFilm);
router.get("/:id", getOneFilm);

export default router;
