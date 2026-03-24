import express from "express";
import {
  deleteOneUser,
  getAllUsers,
  getOneUser,
  signIn,
  signUp,
  updateOneUser,
  getMe,
  logOut
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


//routes fixes
router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/me", authMiddleware, getMe);   
router.post("/logout", authMiddleware, logOut);
router.get("/", getAllUsers);

//routes dynamiques
router.get("/:id", getOneUser);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);
export default router;
