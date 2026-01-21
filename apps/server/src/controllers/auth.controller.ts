import { Request, Response } from "express";
import userService from "../services/user.service.js";

export const signIn = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    const { password, ...userWithoutPassword } = newUser;
    return res.status(201).json({
      message: "Nouvel utilisateur créé",
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "erreur inconnue" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await userService.connexion(req.body);
    return res.status(200).json({
      message: "Connexion",
      user: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "erreur inconnue" });
  }
};

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const usersList = await userService.findAllUsers();
    return res.status(200).json({
      listOfUsers: usersList,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "erreur inconnue" });
  }
};

export const findOneUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "erreur inconnue" });
  }
};
