import express from "express";
import { AnimalController } from "../controllers/animalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", AnimalController.getAllAnimals);
router.get("/:id", AnimalController.getAnimalById);
router.post("/my", authMiddleware, AnimalController.getMyAnimals);
router.post("/", authMiddleware, AnimalController.createAnimal);
router.put("/:id", authMiddleware, AnimalController.updateAnimal);
router.delete("/:id", authMiddleware, AnimalController.deleteAnimal);

export default router;
