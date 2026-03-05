import express from "express";
import userRoute from "./users.route.js";
import filmsRoute from "./films.route.js";
import ratingRoute from "./ratings.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/films", filmsRoute);
router.use("/ratings", ratingRoute);

export default router;
