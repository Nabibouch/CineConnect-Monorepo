import express from "express";
import { addFilm, getAllFilms } from "../controllers/films.controller.js";

const router = express.Router();

router.post("/", addFilm);
router.get("/", getAllFilms);

export default router;
