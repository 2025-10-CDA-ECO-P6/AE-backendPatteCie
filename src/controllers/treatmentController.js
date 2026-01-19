import { prisma } from "../prisma.js";
import { CoreController } from "../core/coreController.js";
import { NotFoundError, BadRequestError } from "../core/httpErrors.js";

export class TreatmentController {

    static getAllTreatments = CoreController.handle(async (req, res) => {
        const treatments = await prisma.treatment.findMany({
            select: {
                treatment_id: true,
                name: true,
                date_start: true,
                date_end: true,
                reason: true,
                comments: true,
            },
        });

        res.json(treatments);
    });

    static getTreatmentById = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        const treatment = await prisma.treatment.findUnique({
            where: { treatment_id: id },
            include: {
                visits: true,
            },
        });

        if (!treatment) {
            throw new NotFoundError("Traitement introuvable");
        }

        res.json(treatment);
    });

    static createTreatment = CoreController.handle(async (req, res) => {
        const {
            name,
            date_start,
            date_end,
            reason,
            comments,
        } = req.body;

        if (!name || !date_start || !date_end || !reason || !comments) {
            throw new BadRequestError("Champs obligatoires manquants");
        }

        const treatment = await prisma.treatment.create({
            data: {
                name,
                date_start: new Date(date_start),
                date_end: new Date(date_end),
                reason,
                comments,
            },
        });

        res.status(201).json(treatment);
    });

    static updateTreatment = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        if (req.body.date_start) {
            req.body.date_start = new Date(req.body.date_start);
        }

        if (req.body.date_end) {
            req.body.date_end = new Date(req.body.date_end);
        }

        const treatment = await prisma.treatment.update({
            where: { treatment_id: id },
            data: req.body,
        });

        res.json(treatment);
    });

    static deleteTreatment = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        await prisma.treatment.delete({
            where: { treatment_id: id },
        });

        res.json({ message: "Traitement supprimé" });
    });
}
