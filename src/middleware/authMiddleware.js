import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Token manquant" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { user_id: payload.user_id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
};
