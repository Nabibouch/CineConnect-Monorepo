import { Request, Response } from "express";
import userService from "../services/user.service.js";

// ✅ SIGNUP = Inscription (createUser)
export const signUp = async (req: Request, res: Response) => {
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

// 🔹 TEMPORAIRE : SIGNIN fait INSERT (comme signup)
export const signIn = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body); // insertion
    const { password, ...userWithoutPassword } = newUser;
    return res.status(201).json({
      message: "Nouvel utilisateur créé (via signin temporaire)",
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "erreur inconnue" });
  }
};

// ✅ getAllUsers
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usersList = await userService.findAllUsers();
    return res.status(200).json({ listOfUsers: usersList });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "erreur inconnue" });
  }
};

// ✅ getOneUser
export const getOneUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "erreur inconnue" });
  }
};

// ✅ updateOneUser
export const updateOneUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateById(req.body, id);
    return res.status(200).json({ message: "Utilisateur modifié", user: updatedUser });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};

// ✅ deleteOneUser
export const deleteOneUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.removeById(id);
    return res.status(200).json({ message: "Utilisateur supprimé", user: deletedUser });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Erreur inconnue" });
  }
};
