import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function resetDatabase() {
  const tables = [
    "Visitor",
    "Employee",
    "Resident",
    "User",
    "Lot"
  ];

  const truncateQuery = `
    TRUNCATE TABLE ${tables.map(t => `"${t}"`).join(", ")} CASCADE;
  `;

  await prisma.$executeRawUnsafe(truncateQuery);
}


export default prisma;
