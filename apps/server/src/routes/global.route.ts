import express from "express";
import userRoute from "./users.route.js";
import filmsRoute from "./films.route.js";
import ratingRoute from "./ratings.route.js";
import postsRoute from "./posts.route.js";
import commentsRoute from "./comments.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/films", filmsRoute);
router.use("/ratings", ratingRoute);
router.use("/posts", postsRoute);
router.use("/comments", commentsRoute);

export default router;
