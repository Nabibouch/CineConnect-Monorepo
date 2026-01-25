import express from "express";
import {
  deleteOneUser,
  findAllUsers,
  findOneUser,
  signIn,
  signUp,
  updateOneUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", findAllUsers);
router.get("/:id", findOneUser);
router.post("/signin", signIn);
router.post("/signup", signUp);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);

export default router;
