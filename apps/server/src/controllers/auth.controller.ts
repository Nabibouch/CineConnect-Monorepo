import { Request, Response } from "express";
import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "../utils/userSchema.js";
import ENV from "../config/ENV.js"; 
import { AuthRequest } from "../middlewares/auth.middleware.js";

// ✅ SIGNUP = Inscription (createUser)
export const signUp = async (req: Request, res: Response) => {
  try {
    // Validation Zod
    const parsed = signUpSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0].message
      });
    }

    const newUser = await userService.createUser(parsed.data);
    const { password, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: "Nouvel utilisateur créé",
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "erreur inconnue" });
  }
};

// 🔹 TEMPORAIRE : SIGNIN fait INSERT (comme signup)

export const signIn = async (req: Request, res: Response) => {
  try {
    // 👇 Validation Zod
    const parsed = signInSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0].message
      });
    }

    const userWithoutPassword = await userService.connexion(parsed.data);
    if (!userWithoutPassword) return res.status(400).json({ error: "Utilisateur non trouvé" });

    // JWT
    const token = jwt.sign(
      { id: userWithoutPassword.id, email: userWithoutPassword.email },
      ENV.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //  Cookie httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Connexion réussie",
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ error: error.message });
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


export const getMe = async (req: AuthRequest, res: Response) => {
  return res.status(200).json({ user: req.user });
};

export const logOut = async (req: AuthRequest, res: Response) => {
  console.log("logOut appelé"); // 👈
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.status(200).json({ message: "Déconnexion réussie" });
};