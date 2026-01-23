import { prisma } from "../prisma.js";
import { CoreController } from "../core/coreController.js";
import { NotFoundError, BadRequestError } from "../core/httpErrors.js";

export class AnimalController {
  static getAllAnimals = CoreController.handle(async (req, res) => {
    const animals = await prisma.animal.findMany({
      select: {
        animal_id: true,
        name: true,
        species: true,
        race: true,
        sex: true,
        weight_kg: true,
        color: true,
        photo: true,
      },
    });

    res.json(animals);
  });

  static getAnimalById = CoreController.handle(async (req, res) => {
    const id = Number(req.params.id);
    if (!id) throw new BadRequestError("ID invalide");

    const animal = await prisma.animal.findUnique({
      where: { animal_id: id },
      include: {
        visits: {
          include: {
            treatments: true,
            vaccines: true,
          },
        },
      },
    });

    if (!animal) throw new NotFoundError("Animal introuvable");

    res.json(animal);
  });

  static getMyAnimals = CoreController.handle(async (req, res) => {
    const ownerId = req.user?.user_id;

    if (!ownerId) {
      throw new Error("Utilisateur non authentifié");
    }

    const animals = await prisma.animal.findMany({
      where: {
        owner_id: ownerId,
      },
      include: {
        visits: {
          include: {
            treatments: true,
            vaccines: true,
          },
        },
      },
    });

    res.json(animals);
  });

  static getAnimalsByUserId = CoreController.handle(async (req, res) => {
    const ownerId = Number(req.params.id);
    if (!ownerId) throw new BadRequestError("ID invalide");

    const owner = await prisma.user.findUnique({
      where: { user_id: ownerId },
    });
    if (!owner) throw new NotFoundError("Utilisateur introuvable");

    const animals = await prisma.animal.findMany({
      where: {
        owner_id: ownerId,
      },
    });

    res.json(animals);
  });

  static createAnimal = CoreController.handle(async (req, res) => {
      const veterinarianId = req.user.user_id;
      const {
          name,
          sex,
          date_of_birth,
          species,
          race,
          weight_kg,
          color,
          sterilizes,
          chip_number,
          photo,
          owner_id,
      } = req.body;

      if (
          !name ||
          !sex ||
          !date_of_birth ||
          !species ||
          !race ||
          !weight_kg ||
          !color ||
          sterilizes === undefined ||
          !chip_number
      ) {
          throw new BadRequestError("Champs obligatoires manquants");
      }

      const animal = await prisma.animal.create({
          data: {
              name,
              sex,
              date_of_birth: new Date(date_of_birth),
              species,
              race,
              weight_kg,
              color,
              sterilizes,
              chip_number,
              photo: photo ?? null,
          },
      });

      res.status(201).json(animal);
  });

  static createAnimal = CoreController.handle(async (req, res) => {
    const {
      name,
      sex,
      date_of_birth,
      species,
      race,
      weight_kg,
      color,
      sterilizes,
      chip_number,
      photo,
      owner_id,
    } = req.body;

    const ownerId = owner_id ? Number(owner_id) : req.user?.user_id;

    if (
      !name ||
      !sex ||
      !date_of_birth ||
      !species ||
      !race ||
      !weight_kg ||
      !color ||
      sterilizes === undefined ||
      !chip_number ||
      !ownerId
    ) {
      throw new BadRequestError("Champs obligatoires manquants");
    }

    const owner = await prisma.user.findUnique({
      where: { user_id: ownerId },
    });
    if (!owner) {
      throw new BadRequestError("Owner introuvable");
    }

    const newAnimal = await prisma.animal.create({
      data: {
        name,
        sex,
        date_of_birth: new Date(date_of_birth),
        species,
        race,
        weight_kg,
        color,
        sterilizes,
        chip_number: parseInt(chip_number, 10),
        photo: photo ?? null,
        owner_id: ownerId,
      },
    });

    res.status(201).json(newAnimal);
  });

  static updateAnimal = CoreController.handle(async (req, res) => {
    const id = Number(req.params.id);
    if (!id) throw new BadRequestError("ID invalide");

    if (req.body.date_of_birth) {
      req.body.date_of_birth = new Date(req.body.date_of_birth);
    }

    const animal = await prisma.animal.update({
      where: { animal_id: id },
      data: req.body,
    });

    res.json(animal);
  });

  static deleteAnimal = CoreController.handle(async (req, res) => {
    const id = Number(req.params.id);
    if (!id) throw new BadRequestError("ID invalide");

    await prisma.animal.delete({
      where: { animal_id: id },
    });

    res.json({ message: "Animal supprimé" });
  });

  //  static getVisits = CoreController.handle(async (req, res) => {
  //   const animalId = Number(req.params.id);

  //   if (!animalId) return res.status(400).json({ error: "Animal ID requis" });

  //   const animal = await prisma.animal.findUnique({
  //     where: { animal_id: animalId },
  //     include: { visits: { include: { treatments: true, vaccines: true } } },
  //   });

  //   if (!animal) return res.status(404).json({ error: "Animal introuvable" });

  //   res.json(animal.visits);
  // });

  // // Récupérer tous les traitements d'un animal
  // static getTreatments = CoreController.handle(async (req, res) => {
  //   const animalId = Number(req.params.id);

  //   if (!animalId) return res.status(400).json({ error: "Animal ID requis" });

  //   const animal = await prisma.animal.findUnique({
  //     where: { animal_id: animalId },
  //     include: { visits: { include: { treatments: true } } },
  //   });

  //   if (!animal) return res.status(404).json({ error: "Animal introuvable" });

  //   // 🔹 Récupère tous les traitements de toutes les visites
  //   const treatments = animal.visits.flatMap((v) => v.treatments);

  //   res.json(treatments);
  // });
}
