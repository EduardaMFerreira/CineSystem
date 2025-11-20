import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken"); // ✅ solução definitiva

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET não definido");
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export class AuthService {
  static async register(nome: string, email: string, senha: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("Email já cadastrado");

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: { nome, email, senha: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { user, token };
  }

  static async login(email: string, senha: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Email ou senha inválidos");

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) throw new Error("Email ou senha inválidos");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { user, token };
  }
}
