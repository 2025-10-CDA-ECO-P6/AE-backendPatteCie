import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token manquant" });

    const token = authHeader.split(" ")[1]; // Bearer <token>
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { user_id: payload.user_id, role: payload.role }; // 🔑 IMPORTANT
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
};
