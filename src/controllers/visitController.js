import { prisma } from "../prisma.js";
import { CoreController } from "../core/coreController.js";
import { NotFoundError, BadRequestError } from "../core/httpErrors.js";

export class VisitController {

    // Récupérer toutes les visites
    static getAllVisits = CoreController.handle(async (req, res) => {
        const visits = await prisma.visit.findMany({
            include: {
                UserVisit: { include: { User: true } },
                Treatment: true,
            },
        });
        res.json(visits);
    });

    // Récupérer une visite par ID
    static getVisitById = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        const visit = await prisma.visit.findUnique({
            where: { visit_id: id },
            include: {
                UserVisit: { include: { User: true } },
                Treatment: true,
            },
        });

        if (!visit) throw new NotFoundError("Visite introuvable");
        res.json(visit);
    });

    // Créer une visite
   static createVisit = CoreController.handle(async (req, res) => {
  const { date, reason, comments, diagnosis, treatment_id } = req.body;

  if (!date || !reason || !comments || !treatment_id) {
    throw new BadRequestError("Champs obligatoires manquants");
  }

  // Vérifie que le traitement existe
  const treatment = await prisma.treatment.findUnique({ where: { treatment_id } });
  if (!treatment) throw new BadRequestError("Traitement introuvable");

  // Crée la visite
  const visit = await prisma.visit.create({
    data: {
      date: new Date(date),
      reason,
      comments,
      diagnosis: diagnosis ?? null,
      treatment_id,
    },
  });

  // Récupère la visite avec le traitement inclus
  const visitWithRelations = await prisma.visit.findUnique({
    where: { visit_id: visit.visit_id },
    include: { Treatment: true },
  });

  res.status(201).json(visitWithRelations);
});


    // Mettre à jour une visite
    static updateVisit = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        const { date, reason, comments, diagnosis, treatment_id, user_ids } = req.body;

        // Met à jour les champs principaux
        const visit = await prisma.visit.update({
            where: { visit_id: id },
            data: {
                date: date ? new Date(date) : undefined,
                reason,
                comments,
                diagnosis,
                treatment_id,
            },
        });

        // Si des users sont fournis, on met à jour la table pivot
        if (Array.isArray(user_ids)) {
            // Supprime les liens existants
            await prisma.userVisit.deleteMany({ where: { visit_id: id } });
            // Crée les nouveaux liens
            await prisma.userVisit.createMany({
                data: user_ids.map(user_id => ({ visit_id: id, user_id })),
            });
        }

        // Retourne la visite avec les users liés
        const visitWithUsers = await prisma.visit.findUnique({
            where: { visit_id: id },
            include: { UserVisit: { include: { User: true } }, Treatment: true },
        });

        res.json(visitWithUsers);
    });

    // Supprimer une visite
    static deleteVisit = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        await prisma.visit.delete({ where: { visit_id: id } });

        res.json({ message: "Visite supprimée" });
    });
}
