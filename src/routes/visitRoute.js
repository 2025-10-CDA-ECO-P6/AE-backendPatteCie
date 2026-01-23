import express from "express";
import { VisitController } from "../controllers/visitController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Visits
 *   description: Gestion des visites vétérinaires
 */

/**
 * @swagger
 * /api/visits:
 *   get:
 *     summary: Récupérer toutes les visites
 *     tags: [Visits]
 *     responses:
 *       200:
 *         description: Liste des visites
 */
router.get("/", VisitController.getAllVisits);

/**
 * @swagger
 * /api/visits/{id}:
 *   get:
 *     summary: Récupérer une visite par ID
 *     tags: [Visits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visite trouvée
 *       404:
 *         description: Visite non trouvée
 */
router.get("/:id", VisitController.getVisitById);

/**
 * @swagger
 * /api/visits:
 *   post:
 *     summary: Créer une nouvelle visite
 *     tags: [Visits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - animal_id
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-05-10
 *               animal_id:
 *                 type: integer
 *                 example: 3
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visite créée
 *       400:
 *         description: Données invalides
 */
router.post("/", VisitController.createVisit);

/**
 * @swagger
 * /api/visits/{id}:
 *   put:
 *     summary: Mettre à jour une visite
 *     tags: [Visits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visite mise à jour
 *       404:
 *         description: Visite non trouvée
 */
router.put("/:id", VisitController.updateVisit);

/**
 * @swagger
 * /api/visits/{id}:
 *   delete:
 *     summary: Supprimer une visite
 *     tags: [Visits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visite supprimée
 *       404:
 *         description: Visite non trouvée
 */
router.delete("/:id", VisitController.deleteVisit);

export default router;
