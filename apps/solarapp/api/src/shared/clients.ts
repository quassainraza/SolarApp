import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'pretty',
  log: [],
});

export const DBClient = () => {
  return prisma;
};
