import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDatabase = async () => {
  return prisma;
};

export default prisma;
