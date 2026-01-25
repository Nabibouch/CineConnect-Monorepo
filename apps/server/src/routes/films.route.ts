import express from "express";
import {
  addFilm,
  deleteOneFilm,
  getAllFilms,
  updateOneFilm,
} from "../controllers/films.controller.js";

const router = express.Router();

router.post("/", addFilm);
router.get("/", getAllFilms);
router.put("/:id", updateOneFilm);
router.delete("/:id", deleteOneFilm);

export default router;
