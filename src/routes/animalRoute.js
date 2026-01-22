import express from "express";
import { AnimalController } from "../controllers/animalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", authMiddleware, AnimalController.getMyAnimals);
router.get("/", AnimalController.getAllAnimals);
// router.get("/:id/visits", authMiddleware, AnimalController.getVisits);
// router.get("/:id/treatments", authMiddleware, AnimalController.getTreatments);
router.get("/:id", AnimalController.getAnimalById);
router.post("/", authMiddleware, AnimalController.createAnimal);
router.put("/:id", authMiddleware, AnimalController.updateAnimal);
router.delete("/:id", authMiddleware, AnimalController.deleteAnimal);

export default router;
