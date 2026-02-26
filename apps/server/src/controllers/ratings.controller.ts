import { Request, Response } from "express";
import ratingService from "../services/ratings.service.js";

export const addRating = async (req : Request, res: Response) => {
    try {
        const newRating = ratingService.createRating(req.body);
        return res.status(201).json({message: "note ajouté", note: newRating})
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

