import { Request, Response } from "express";
import ratingService from "../services/ratings.service.js";

export const addRating = async (req : Request, res: Response) => {
    try {
        const newRating = ratingService.createRating(req.body);
        return res.status(201).json({message: "note ajouté", note: (await newRating).rate})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message})
        }
    }
};

export const getAllRatings = async (req: Request, res: Response) => {
    try {
        const allRatings = ratingService.findAllRatings();
        return res.status(200).json({allRatings});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }
    }
}

export const updateOneRating = async (req: Request<{id: string}>, res: Response) => {
    try {
        const {id} = req.params;
        const updatedRating = ratingService.updateById(id, req.body);
        return res.status(200).json({message: "note modifié", note: updatedRating})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message})
        }
    }
}

export const deleteOneRating = async (
    req: Request<{ id: string }>,
    res: Response,
  ) => {
    try {
      const { id } = req.params;
      const deletedRating = await ratingService.removeById(id);
      return res
        .status(200)
        .json({ message: "note supprimé", note: deletedRating });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erreur inconnue" });
    }
  };

export const getOneRating = async (
    req: Request<{ id: string }>,
    res: Response,
  ) => {
    try {
      const { id } = req.params;
      const rating = await ratingService.findRatingById(id);
      return res.status(200).json({ rating: rating });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erreur inconnue" });
    }
  };
