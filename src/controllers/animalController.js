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
    });

    res.json(animals);
  });
  // static createAnimal = CoreController.handle(async (req, res) => {
  //     const veterinarianId = req.user.user_id;
  //     const {
  //         name,
  //         sex,
  //         date_of_birth,
  //         species,
  //         race,
  //         weight_kg,
  //         color,
  //         sterilizes,
  //         chip_number,
  //         photo,
  //         owner_id,
  //     } = req.body;

  //     if (
  //         !name ||
  //         !sex ||
  //         !date_of_birth ||
  //         !species ||
  //         !race ||
  //         !weight_kg ||
  //         !color ||
  //         sterilizes === undefined ||
  //         !chip_number
  //     ) {
  //         throw new BadRequestError("Champs obligatoires manquants");
  //     }

  //     const animal = await prisma.animal.create({
  //         data: {
  //             name,
  //             sex,
  //             date_of_birth: new Date(date_of_birth),
  //             species,
  //             race,
  //             weight_kg,
  //             color,
  //             sterilizes,
  //             chip_number,
  //             photo: photo ?? null,
  //         },
  //     });

  //     res.status(201).json(animal);
  // });

  static createAnimal = CoreController.handle(async (req, res) => {
    const veterinarianId = req.user.user_id; // vétérinaire connecté
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

    // Transaction pour créer l'animal et les liaisons
    const newAnimal = await prisma.$transaction(async (tx) => {
      // 1️⃣ Créer l'animal
      const animal = await tx.animal.create({
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
          owner_id: owner_id ?? null,
        },
      });

      // 2️⃣ Lier le vétérinaire connecté
      await tx.userAnimal.create({
        data: {
          user_id: veterinarianId,
          animal_id: animal.animal_id,
          role: "VETERINARIAN",
        },
      });

      // 3️⃣ Lier un owner si fourni
      if (owner_id) {
        // vérifier que le user existe
        const owner = await tx.user.findUnique({
          where: { user_id: owner_id },
        });
        if (!owner) {
          throw new BadRequestError("Owner introuvable");
        }

        await tx.userAnimal.create({
          data: {
            user_id: owner_id,
            animal_id: animal.animal_id,
            role: "OWNER",
          },
        });
      }

      return animal;
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
}
