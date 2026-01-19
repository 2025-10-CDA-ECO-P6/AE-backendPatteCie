import { Router } from "express";
import { TreatmentController } from "../controllers/treatmentController.js";

const router = Router();

router.get("/", TreatmentController.getAllTreatments);
router.get("/:id", TreatmentController.getTreatmentById);
router.post("/", TreatmentController.createTreatment);
router.put("/:id", TreatmentController.updateTreatment);
router.delete("/:id", TreatmentController.deleteTreatment);

export default router;