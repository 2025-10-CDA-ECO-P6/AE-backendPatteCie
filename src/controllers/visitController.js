import { prisma } from "../prisma.js";
import { CoreController } from "../core/coreController.js";
import { NotFoundError, BadRequestError } from "../core/httpErrors.js";

export class VisitController {
  // Récupérer toutes les visites
  static getAllVisits = CoreController.handle(async (req, res) => {
    const visits = await prisma.visit.findMany({
      include: {
        owner: true,
        veterinarian: true,
        treatment: true,
        visitUsers: { include: { user: true } },
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
        owner: true,
        veterinarian: true,
        treatment: true,
        visitUsers: { include: { user: true } },
      },
    });

    if (!visit) throw new NotFoundError("Visite introuvable");
    res.json(visit);
  });

  // Créer une visite
  static createVisit = CoreController.handle(async (req, res) => {
    const {
      date,
      reason,
      comments,
      diagnosis,
      treatment_id,
      owner_id,
      veterinarian_id,
    } = req.body;

    // Vérifie les champs obligatoires
    if (
      !date ||
      !reason ||
      !comments ||
      !treatment_id ||
      !owner_id ||
      !veterinarian_id
    ) {
      throw new BadRequestError("Champs obligatoires manquants");
    }

    // Vérifie que le traitement existe
    const treatment = await prisma.treatment.findUnique({
      where: { treatment_id },
    });
    if (!treatment) throw new BadRequestError("Traitement introuvable");

    // Vérifie que le propriétaire existe
    const owner = await prisma.user.findUnique({
      where: { user_id: owner_id },
    });
    if (!owner) throw new BadRequestError("Propriétaire introuvable");

    // Vérifie que le vétérinaire existe
    const veterinarian = await prisma.user.findUnique({
      where: { user_id: veterinarian_id },
    });
    if (!veterinarian) throw new BadRequestError("Vétérinaire introuvable");

    // Crée la visite
    const visit = await prisma.visit.create({
      data: {
        date: new Date(date),
        reason,
        comments,
        diagnosis: diagnosis ?? null,
        treatment_id,
        owner_id,
        vaterinarian_id: veterinarian_id, // attention au nom exact du champ
      },
      include: {
        treatment: true,
        owner: true,
        veterinarian: true,
      },
    });

    res.status(201).json(visit);
  });

  // Mettre à jour une visite
  static updateVisit = CoreController.handle(async (req, res) => {
    const id = Number(req.params.id);
    if (!id) throw new BadRequestError("ID invalide");

    const { date, reason, comments, diagnosis, treatment_id, user_ids } =
      req.body;

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
        data: user_ids.map((user_id) => ({ visit_id: id, user_id })),
      });
    }

    // Retourne la visite avec les users liés
    const visitWithUsers = await prisma.visit.findUnique({
      where: { visit_id: id },
      include: { visitUsers: { include: { user: true } }, treatment: true },
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
