import express from "express";
import { VisitController } from "../controllers/visitController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();


router.get("/", VisitController.getAllVisits);
router.get("/:id", VisitController.getVisitById);
router.post("/", VisitController.createVisit);
router.put("/:id", VisitController.updateVisit);
router.delete("/:id", VisitController.deleteVisit);

export default router;