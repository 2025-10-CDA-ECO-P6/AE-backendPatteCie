import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    await prisma.treatmentVisit.deleteMany();
    await prisma.visit.deleteMany();
    await prisma.treatment.deleteMany();
    await prisma.userAnimal.deleteMany();
    await prisma.animal.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.user.createMany({
        data: [
            {
                name: 'Dupont',
                first_name: 'Jean',
                phone: '0612345678',
                email: 'jean.dupont@mail.com',
                password: hashedPassword,
                address: '12 rue des Lilas, Paris',
                role: 'client',
            },
            {
                name: 'Martin',
                first_name: 'Claire',
                phone: '0698765432',
                email: 'claire.martin@mail.com',
                password: hashedPassword,
                address: '5 avenue Victor Hugo, Lyon',
                role: 'client',
            },
            {
                name: 'Durand',
                first_name: 'Alice',
                phone: '0611223344',
                email: 'alice.durand@pattec.ie',
                password: hashedPassword,
                address: '10 rue de la Clinique, Paris',
                role: 'veterinaire',
            },
            {
                name: 'Bernard',
                first_name: 'Paul',
                phone: '0655667788',
                email: 'paul.bernard@pattec.ie',
                password: hashedPassword,
                address: '10 rue de la Clinique, Paris',
                role: 'assistant',
            },
            {
                name: 'Leroy',
                first_name: 'Sophie',
                email: 'sophie.leroy@pattec.ie',
                password: hashedPassword,
                role: 'veterinaire',
            },
        ],
    });

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
