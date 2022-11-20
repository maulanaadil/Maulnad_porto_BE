import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUserAdmin() {
  await prisma.user.upsert({
    where: { email: "resaherlyan@maulnad.com" },
    update: {},
    create: {
      email: "resaherlyan@maulnad.com",
      name: "Resa Herlyan",
      password: "Maulnad2001",
      role: "Admin",
    },
  });

  console.log(`data has been created 🙌`);
}

seedUserAdmin()
  .catch((e: Error) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
