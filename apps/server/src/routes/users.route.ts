import express from "express";
import {
  deleteOneUser,
  getAllUsers,
  getOneUser,
  signIn,
  signUp,
  updateOneUser,
} from "../controllers/auth.controller.js";

const router = express.Router();


//routes fixes
router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/", getAllUsers);

//routes dynamiques
router.get("/:id", getOneUser);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);
export default router;
