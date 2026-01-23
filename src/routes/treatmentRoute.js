import { Router } from "express";
import { TreatmentController } from "../controllers/treatmentController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Treatments
 *   description: Gestion des traitements
 */

/**
 * @swagger
 * /api/treatments:
 *   get:
 *     summary: Récupérer tous les traitements
 *     tags: [Treatments]
 *     responses:
 *       200:
 *         description: Liste de tous les traitements
 */
router.get("/", TreatmentController.getAllTreatments);

/**
 * @swagger
 * /api/treatments/{id}:
 *   get:
 *     summary: Récupérer un traitement par ID
 *     tags: [Treatments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Traitement trouvé
 *       404:
 *         description: Traitement non trouvé
 */
router.get("/:id", TreatmentController.getTreatmentById);

/**
 * @swagger
 * /api/treatments:
 *   post:
 *     summary: Créer un nouveau traitement
 *     tags: [Treatments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Vaccination
 *               description:
 *                 type: string
 *                 example: Vaccination annuelle
 *     responses:
 *       201:
 *         description: Traitement créé
 *       400:
 *         description: Données invalides
 */
router.post("/", TreatmentController.createTreatment);

/**
 * @swagger
 * /api/treatments/{id}:
 *   put:
 *     summary: Mettre à jour un traitement
 *     tags: [Treatments]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Traitement mis à jour
 *       404:
 *         description: Traitement non trouvé
 */
router.put("/:id", TreatmentController.updateTreatment);

/**
 * @swagger
 * /api/treatments/{id}:
 *   delete:
 *     summary: Supprimer un traitement
 *     tags: [Treatments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Traitement supprimé
 *       404:
 *         description: Traitement non trouvé
 */
router.delete("/:id", TreatmentController.deleteTreatment);

export default router;
