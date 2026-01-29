import express from "express";
import userRoute from "./users.route.js";
import filmsRoute from "./films.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/films", filmsRoute);

export default router;
