import express from "express";
import {
  addCategory,
  deleteOneCategory,
  getAllCategories,
  getOneCategory,
  updateOneCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/", addCategory);
router.get("/", getAllCategories);
router.get("/:id", getOneCategory);
router.put("/:id", updateOneCategory);
router.delete("/:id", deleteOneCategory);

export default router;
