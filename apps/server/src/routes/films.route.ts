import express from "express";
import {
  addFilm,
  deleteOneFilm,
  getAllFilms,
  getOneFilm,
  updateOneFilm,
} from "../controllers/films.controller.js";
import { importFromOMDB } from "../controllers/films.controller.js";

const router = express.Router();

router.post("/", addFilm);
router.post("/import-omdb", importFromOMDB);
router.get("/", getAllFilms);
router.put("/:id", updateOneFilm);
router.delete("/:id", deleteOneFilm);
router.get("/:id", getOneFilm);

export default router;
