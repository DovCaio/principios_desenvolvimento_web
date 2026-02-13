import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function resetDatabase() {
  const tables = [
    "Visitor",
    "Employee",
    "Resident",
    "User",
    "Lot",
    "Scheduling",
    "ServiceRequest",
    "AuditLog"
  ];

  const truncateQuery = `
    TRUNCATE TABLE ${tables.map(t => `"${t}"`).join(", ")} CASCADE;
  `;

  await prisma.$executeRawUnsafe(truncateQuery);
}

export async function createUserFromPayload(payload: any) {
  const { employee, resident, visitor, ...userData } = payload;

  const user = await prisma.user.create({
    data: userData,
    select: { cpf: true, userType: true },
  });

  if (payload.userType === "EMPLOYEE" && employee) {
    await prisma.employee.create({
      data: {
        ...employee,
        user: {
          connect: {
            cpf: user.cpf,
          },
        },
      },
    });
  }

  if (payload.userType === "RESIDENT") {
    await prisma.resident.create({
      data: {
        user: {
          connect: {
            cpf: user.cpf,
          },
        },
      },
    });
  }

  if (payload.userType === "VISITOR") {
    await prisma.visitor.create({
      data: {
        user: {
          connect: {
            cpf: user.cpf,
          },
        },
      },
    });
  }

  return user;
}


export async function saveAudit(audit: any) {

  await prisma.auditLog.create({
    data: audit,
  });

}

export default prisma;
