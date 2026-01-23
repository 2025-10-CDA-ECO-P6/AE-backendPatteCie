import express from "express";
import { AnimalController } from "../controllers/animalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Animals
 *   description: Gestion des animaux
 */

/**
 * @swagger
 * /api/animals/my:
 *   get:
 *     summary: Récupérer les animaux de l'utilisateur connecté
 *     tags: [Animals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des animaux de l'utilisateur
 *       401:
 *         description: Non authentifié
 */
router.get("/my", authMiddleware, AnimalController.getMyAnimals);

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Récupérer tous les animaux
 *     tags: [Animals]
 *     responses:
 *       200:
 *         description: Liste de tous les animaux
 */
router.get("/", AnimalController.getAllAnimals);

/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     summary: Récupérer un animal par ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Animal trouvé
 *       404:
 *         description: Animal non trouvé
 */
router.get("/:id", AnimalController.getAnimalById);

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Créer un nouvel animal
 *     tags: [Animals]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Animal créé
 *       401:
 *         description: Non authentifié
 */
router.post("/", authMiddleware, AnimalController.createAnimal);

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: Mettre à jour un animal
 *     tags: [Animals]
 *     security:
 *       - cookieAuth: []
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
 *               species:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Animal mis à jour
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Animal non trouvé
 */
router.put("/:id", authMiddleware, AnimalController.updateAnimal);

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: Supprimer un animal
 *     tags: [Animals]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Animal supprimé
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Animal non trouvé
 */
router.delete("/:id", authMiddleware, AnimalController.deleteAnimal);

export default router;
