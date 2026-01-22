import express from "express";
import {
  findAllUsers,
  findOneUser,
  signIn,
  signUp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", findAllUsers);
router.get("/:id", findOneUser);
router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;
