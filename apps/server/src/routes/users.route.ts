import express from "express";
import {
  deleteOneUser,
  getAllUsers,
  getFollowCounts,
  getFollowStatus,
  followUser,
  getOneUser,
  signIn,
  signUp,
  unfollowUser,
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
router.get("/:id/follow-status/:followerId", getFollowStatus);
router.get("/:id/follow-counts", getFollowCounts);
router.post("/:id/follow", followUser);
router.delete("/:id/follow", unfollowUser);

//routes dynamiques
router.get("/:id", getOneUser);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);
export default router;