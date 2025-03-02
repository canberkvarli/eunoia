import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const passwordHash1 = await bcrypt.hash("password123", 10);
  const passwordHash2 = await bcrypt.hash("securepass", 10);
  const passwordHash3 = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {
      name: "Demo User",
      password: "demo1234",
    },
    create: {
      email: "demo@example.com",
      name: "Demo User",
      password: "demo1234",
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        password: passwordHash1,
      },
      {
        email: "user2@example.com",
        password: passwordHash2,
      },
      {
        email: "another@gmail.com",
        password: passwordHash3,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database has been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
