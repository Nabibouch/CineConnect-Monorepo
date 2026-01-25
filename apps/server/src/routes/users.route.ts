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

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/signin", signIn);
router.post("/signup", signUp);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);

export default router;
