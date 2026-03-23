// src/routes/conversations.route.ts
import express from "express";
import {
  createConversation,
  addMember,
  getUserConversations,
} from "../controllers/conversations.controller.js";

const router = express.Router();

router.post("/", createConversation);
router.post("/:id/members", addMember);
router.get("/user/:userId", getUserConversations);

export default router;
//