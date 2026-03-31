import { Request, Response } from "express";
import categoryService from "../services/categories.service.js";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    return res.status(201).json({
      message: "Categorie ajoutee",
      category: newCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await categoryService.findAllCategories();
    return res.status(200).json(allCategories);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const updateOneCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const updatedCategory = await categoryService.updateById(id, req.body);
    return res.status(200).json({
      message: "Categorie modifiee",
      category: updatedCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const deleteOneCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryService.removeById(id);
    return res.status(200).json({
      message: "Categorie supprimee",
      category: deletedCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const getOneCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const category = await categoryService.findCategoryById(id);
    return res.status(200).json({ category });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};
