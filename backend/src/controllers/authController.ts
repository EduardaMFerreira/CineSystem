import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { z } from "zod";

// DTOs (validação com Zod)
const registerSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export class AuthController {
  // Registro de usuário
  static async register(req: Request, res: Response) {
    try {
      // Valida os dados do corpo da requisição
      const { nome, email, senha } = registerSchema.parse(req.body);

      // Chama o serviço de registro
      const result = await AuthService.register(nome, email, senha);

      // Retorna JSON com usuário criado
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Login de usuário
  static async login(req: Request, res: Response) {
    try {
      // Valida os dados do corpo da requisição
      const { email, senha } = loginSchema.parse(req.body);

      // Chama o serviço de login
      const result = await AuthService.login(email, senha);

      // Retorna JSON com token JWT
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
