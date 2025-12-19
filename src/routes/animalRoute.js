import express from "express";
import { AnimalController } from "../controllers/animalController.js";

const router = express.Router();

router.get("/", AnimalController.getAllAnimals);
router.get("/:id", AnimalController.getAnimalById);
router.post("/", AnimalController.createAnimal);
router.put("/:id", AnimalController.updateAnimal);
router.delete("/:id", AnimalController.deleteAnimal);

export default router;
