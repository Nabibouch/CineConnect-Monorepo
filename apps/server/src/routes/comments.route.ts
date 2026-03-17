import express from "express";
import {
  addComment,
  deleteOneComment,
  getAllComments,
  getOneComment,
  updateOneComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.post("/", addComment);
router.get("/", getAllComments);
router.get("/:id", getOneComment);
router.put("/:id", updateOneComment);
router.delete("/:id", deleteOneComment);

export default router;
