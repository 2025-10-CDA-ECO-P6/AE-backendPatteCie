import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification et gestion des sessions
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - first_name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dupont
 *               first_name:
 *                 type: string
 *                 example: Jean
 *               email:
 *                 type: string
 *                 example: jean@email.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               role:
 *                 type: string
 *                 example: user
 *               phone:
 *                 type: string
 *                 example: "0601020304"
 *               address:
 *                 type: string
 *                 example: "12 rue des Fleurs, Paris"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jean@email.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Connexion réussie (cookie JWT envoyé)
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion utilisateur
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post("/logout", logoutUser);

router.get("/me", authMiddleware, getMe);

export default router;
