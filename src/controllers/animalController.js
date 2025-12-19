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
