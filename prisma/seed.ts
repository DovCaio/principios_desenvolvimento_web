import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("123456", 8);

  const admin = await prisma.user.upsert({
    where: { cpf: "99999999999" },
    update: {}, 
    create: {
      cpf: "99999999999",
      name: "Admin de Teste",
      password: passwordHash,
      userType: "EMPLOYEE", 
      phone: "99999999999",
    },
  });

  console.log("✅ Usuário criado com sucesso!");
  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });