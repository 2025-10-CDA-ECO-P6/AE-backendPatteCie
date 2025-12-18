import bcrypt from "bcryptjs";
import { prisma } from "../prisma.js";

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      first_name,
      email,
      password,
      role,
      phone,
      address,
    } = req.body;

    // 1️⃣ Validation minimale
    if (!name || !first_name || !email || !password || !role) {
      return res.status(400).json({
        message: "Champs obligatoires manquants",
      });
    }

    // Vérification email unique
    const existingUser = await prisma.User.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Un utilisateur avec cet email existe déjà",
      });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création utilisateur
    const user = await prisma.User.create({
      data: {
        name,
        first_name,
        email,
        password: hashedPassword,
        role,
        phone: phone ?? null,
        address: address ?? null,
      },
    });

    // Réponse sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: userWithoutPassword,
    });

  } catch (error) {
    // Conflit unique Prisma
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Un utilisateur avec cet email existe déjà",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await prisma.User.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // TODO: Générer un token JWT ici
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Connexion réussie",
      user: userWithoutPassword,
    });

  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({ message: "Erreur serveur interne" });
  }
};

export const logoutUser = (req, res) => {
  return res.status(200).json({ message: "Déconnexion réussie" });
};