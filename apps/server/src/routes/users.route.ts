import express from "express";
import {
  findAllUsers,
  findOneUser,
  signIn,
  signUp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/users", findAllUsers);
router.get("/users/:id", findOneUser);
router.post("/users/signin", signIn);
router.post("/users/signup", signUp);

export default router;
