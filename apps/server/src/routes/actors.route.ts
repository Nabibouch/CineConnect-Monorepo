import { Router } from "express";
import { addActor, getAllActors, getOneActor } from "../controllers/actors.controller.js";

const router = Router();

router.post("/", addActor);   // utilisé par le seeder
router.get("/", getAllActors);
router.get("/:id", getOneActor); // utilisé par le front

export default router;