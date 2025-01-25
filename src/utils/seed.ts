import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const passwordHash1 = await bcrypt.hash("password123", 10);
  const passwordHash2 = await bcrypt.hash("securepass", 10);

  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        password: passwordHash1,
        provider: "LOCAL",
      },
      {
        email: "user2@example.com",
        password: passwordHash2,
        provider: "LOCAL",
      },
      {
        email: "oauth_user@gmail.com",
        provider: "GOOGLE",
        providerId: "google-123456",
      },
    ],
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
