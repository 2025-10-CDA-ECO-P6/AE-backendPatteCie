import { HttpError } from "./httpErrors.js";

export const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err instanceof HttpError) {
        return res.status(err.status).json({
            error: err.message,
        });
    }

    // Prisma
    if (err.code === "P2025") {
        return res.status(404).json({ error: "Ressource non trouvée" });
    }

    if (err.code === "P2002") {
        return res.status(409).json({ error: "Conflit de données" });
    }

    return res.status(500).json({
        error: "Erreur serveur",
    });
};
