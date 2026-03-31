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
    return res.status(200).json(findAllFilms);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error inconnue" });
  }
};

export const updateOneFilm = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const updatedFilm = await filmService.updateById(id, req.body);
    return res.status(200).json({ message: "Film updated", film: updatedFilm });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const deleteOneFilm = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const deletedFilm = await filmService.removeById(id);
    return res
      .status(200)
      .json({ message: "film supprimé", film: deletedFilm });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const getOneFilm = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const film = await filmService.findFilmById(id);
    return res.status(200).json(film);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const addCategoryToFilm = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { category } = req.body as { category?: string };

    if (!category) {
      return res.status(400).json({ error: "La categorie est requise" });
    }

    const updatedFilm = await filmService.addCategoryToFilm(id, category);
    return res.status(200).json({
      message: "Categorie ajoutee au film",
      film: updatedFilm,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const deleteCategoryFromFilm = async (
  req: Request<{ id: string; category: string }>,
  res: Response,
) => {
  try {
    const { id, category } = req.params;
    const updatedFilm = await filmService.removeCategoryFromFilm(
      id,
      category,
    );

    return res.status(200).json({
      message: "Categorie supprimée du film",
      film: updatedFilm,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};
