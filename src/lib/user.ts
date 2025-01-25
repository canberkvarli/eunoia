import { prisma } from "./prisma";

// Create a new user
export const createUser = async (email: string, password: string) => {
  return await prisma.user.create({
    data: { email, password },
  });
};

// Find a user by email
export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
