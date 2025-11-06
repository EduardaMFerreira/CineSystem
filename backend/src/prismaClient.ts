import { PrismaClient } from "@prisma/client";

// Cria uma instância única do Prisma para o projeto
// Usada para acessar o banco de dados
export const prisma = new PrismaClient();
