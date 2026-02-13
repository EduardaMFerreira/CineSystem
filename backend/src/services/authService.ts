import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { EmailService } from "./emailService";

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

  static async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Por segurança, não revelamos se o email existe ou não
      return { message: "Se o email existir, um código será enviado" };
    }

    // Gera um código de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // Expira em 15 minutos

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: codigo,
        resetTokenExpires: expiresAt,
      },
    });

    // Envia o código por email
    try {
      await EmailService.sendPasswordResetCode(email, codigo);
      console.log(`Código de verificação enviado por email para ${email}`);
    } catch (error: any) {
      console.error(`Erro ao enviar email para ${email}:`, error.message);
      // Ainda assim, salvamos o código no banco para que possa ser usado
      // Em caso de falha no envio, o código ainda aparece no console para desenvolvimento
      console.log(`Código de verificação (fallback): ${codigo}`);
    }

    return { message: "Código de verificação enviado para seu email" };
  }

  static async verifyCode(email: string, codigo: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.resetToken || !user.resetTokenExpires) {
      throw new Error("Código inválido ou expirado");
    }

    if (user.resetToken !== codigo) {
      throw new Error("Código inválido");
    }

    if (new Date() > user.resetTokenExpires) {
      throw new Error("Código expirado");
    }

    // Gera um token temporário para redefinir a senha
    const resetToken = jwt.sign(
      { userId: user.id, email, type: "password-reset" },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return { token: resetToken };
  }

  static async resetPassword(email: string, token: string, novaSenha: string) {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      if (decoded.type !== "password-reset" || decoded.email !== email) {
        throw new Error("Token inválido");
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      await prisma.user.update({
        where: { email },
        data: {
          senha: hashedPassword,
          resetToken: null,
          resetTokenExpires: null,
        },
      });

      return { message: "Senha redefinida com sucesso" };
    } catch (error: any) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        throw new Error("Token inválido ou expirado");
      }
      throw error;
    }
  }
}
