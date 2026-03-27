import express from "express";
import {
  addPost,
  deleteOnePost,
  getAllPosts,
  getOnePost,
  updateOnePost,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.post("/", addPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id", updateOnePost);
router.delete("/:id", deleteOnePost);

export default router;
