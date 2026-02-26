import express from "express";
import { 
    addRating, 
    deleteOneRating, 
    getAllRatings, 
    getOneRating, 
    updateOneRating 
} from "../controllers/ratings.controller.js";


const router = express.Router();

router.post("/", addRating);
router.get("/", getAllRatings);
router.put("/:id", updateOneRating);
router.delete("/:id", deleteOneRating);
router.get("/:id", getOneRating);

export default router;
