import { prisma } from "../prisma.js";
import { CoreController } from "../core/coreController.js";
import { NotFoundError, BadRequestError } from "../core/httpErrors.js";
import bcrypt from "bcryptjs";

export class UserController {
    static getAllUsers = CoreController.handle(async (req, res) => {
        const users = await prisma.User.findMany({
            select: {
                user_id: true,
                name: true,
                first_name: true,
                email: true,
                role: true,
                phone: true,
                address: true,
            },
        });
        res.json(users);
    });

    static getUserById = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        const user = await prisma.user.findUnique({ where: { user_id: id } });
        if (!user) throw new NotFoundError("Utilisateur introuvable");

        const { password, ...safeUser } = user;
        res.json(safeUser);
    });

    static createUser = CoreController.handle(async (req, res) => {
        const { name, first_name, email, password, role, phone, address } = req.body;

        if (!name || !first_name || !email || !password || !role) {
            throw new BadRequestError("Champs obligatoires manquants");
        }

        // Hasher le MDP
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                name,
                first_name,
                email,
                password: hashedPassword,
                role,
                phone: phone ?? null,
                address: address ?? null,
            },
        });

        const { password: _, ...safeUser } = user;
        res.status(201).json(safeUser);
    });

    static updateUser = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await prisma.user.update({
            where: { user_id: id },
            data: req.body,
        });

        const { password, ...safeUser } = user;
        res.json(safeUser);
    });

    static deleteUser = CoreController.handle(async (req, res) => {
        const id = Number(req.params.id);
        if (!id) throw new BadRequestError("ID invalide");

        await prisma.user.delete({ where: { user_id: id } });
        res.json({ message: "Utilisateur supprimé" });
    });
}
