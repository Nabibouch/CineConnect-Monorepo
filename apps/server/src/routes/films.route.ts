import express from "express";
import {
  addFilm,
  deleteOneFilm,
  getAllFilms,
  getOneFilm,
  updateOneFilm,
} from "../controllers/films.controller.js";

const router = express.Router();

router.post("/", addFilm);
router.get("/", getAllFilms);
router.put("/:id", updateOneFilm);
router.delete("/:id", deleteOneFilm);
router.get("/:id", getOneFilm);

export default router;
