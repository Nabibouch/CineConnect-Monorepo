import { Request, Response } from "express";
import filmService from "../services/films.service.js";

export const addFilm = async (req: Request, res: Response) => {
  try {
    const newFilm = await filmService.createFilm(req.body);
    return res.status(201).json({
      message: "Nouveau film ajouté",
      film: newFilm,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const getAllFilms = async (req: Request, res: Response) => {
  try {
    const findAllFilms = await filmService.findAllFilms();
    return res.status(200).json({
      listOfFilms: findAllFilms,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error inconnue" });
  }
};
