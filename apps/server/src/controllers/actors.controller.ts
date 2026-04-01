import { Request, Response } from "express";
import actorService from "../services/actors.service.js";

export const addActor = async (req: Request, res: Response) => {
  try {
    const newActor = await actorService.createActor(req.body);
    return res.status(201).json({ message: "Acteur ajouté", actor: newActor });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const getAllActors = async (req: Request, res: Response) => {
  try {
    const allActors = await actorService.findAllActors();
    return res.status(200).json(allActors);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

export const getOneActor = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const actor = await actorService.findActorById(req.params.id);
    return res.status(200).json(actor);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};