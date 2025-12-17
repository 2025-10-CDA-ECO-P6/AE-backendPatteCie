import bcrypt from "bcrypt";
import prisma from "../prisma.js";


export const registerUser = async (req, res) => {
  try {
    console.log("=== registerUser called ===");
    console.log("req.body:", req.body);

    if (!req.body) {
      console.error("req.body is undefined!");
      return res.status(400).json({ message: "Body is missing" });
    }

    const { name, first_name, phone, email, password, address, role } = req.body;

    console.log("Destructured fields:", { name, first_name, phone, email, password, address, role });

    if (!name || !first_name || !email || !password || !role) {
      console.error("Validation failed: missing required fields");
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.warn("User already exists:", email);
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        name,
        first_name,
        phone: phone || null,
        email,
        password: hashedPassword,
        address: address || null,
        role,
      },
    });

    console.log("New user created:", newUser.user_id);

    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });

  } catch (err) {
    console.error("Error in registerUser:", err);

    if (err.code === 'P2002') {
      return res.status(409).json({
        message: "Un utilisateur avec cet email existe déjà"
      });
    }

    return res.status(500).json({
      message: "Erreur serveur interne",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await prisma.user.findUnique({
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