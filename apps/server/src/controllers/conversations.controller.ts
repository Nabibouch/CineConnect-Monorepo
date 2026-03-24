// src/controllers/conversations.controller.ts
import { Request, Response } from "express";
import conversationService from "../services/conversations.service.js";

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { userIds } = req.body;
    const conversation = await conversationService.createConversation(userIds);
    res.status(201).json(conversation);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const member = await conversationService.addMember(String(id), userId);
    res.status(201).json(member);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
};

export const getUserConversations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const conversations = await conversationService.findAllByUserId(String(userId));
    res.status(200).json(conversations);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
};
//