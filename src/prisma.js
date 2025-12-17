// import { PrismaClient } from "@prisma/client";
// import { Pool, neonConfig } from "@neondatabase/serverless";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import ws from "ws";

// neonConfig.webSocketConstructor = ws;

// const connectionString = process.env.DATABASE_URL;

// const pool = new Pool({ connectionString });

// const adapter = new PrismaNeon(pooAl);

// const globalForPrisma = global;

// const prisma = globalForPrisma.prisma || new PrismaClient({
//     adapter,
//     log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
// });

// if (process.env.NODE_ENV !== 'production') {
//     globalForPrisma.prisma = prisma;
// }

// process.on('beforeExit', async () => {
//     await prisma.$disconnect();
//     await pool.end();
// });

// export default prisma;
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
