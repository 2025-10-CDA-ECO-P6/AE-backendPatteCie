import bcrypt from "bcrypt";
import { defineConfig } from "prisma/config";
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
        phone,
        email,
        password: hashedPassword,
        address,
        role,
      },
    });

    console.log("New user created:", newUser);

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.user_id,
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const loginUser = (req, res) => {
};

export const logoutUser = (req, res) => {
};