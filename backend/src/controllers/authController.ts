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
  senha: z.string().min(1, "A senha é obrigatória").min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

const verifyCodeSchema = z.object({
  email: z.string().email("Email inválido"),
  codigo: z.string().length(6, "Código deve ter 6 dígitos"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
  token: z.string(),
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
      console.log("Tentativa de login recebida:", { email: req.body.email });
      
      // Valida os dados do corpo da requisição
      const { email, senha } = loginSchema.parse(req.body);

      // Chama o serviço de login
      const result = await AuthService.login(email, senha);
      
      console.log("Login bem-sucedido para:", email);

      // Retorna JSON com token JWT
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Erro no login:", error.message);
      // Retorna 401 para credenciais inválidas, 400 para outros erros
      const statusCode = error.message.includes("inválidos") ? 401 : 400;
      res.status(statusCode).json({ message: error.message });
    }
  }

  // Esqueceu a senha
  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = forgotPasswordSchema.parse(req.body);
      const result = await AuthService.forgotPassword(email);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Verificar código
  static async verifyCode(req: Request, res: Response) {
    try {
      const { email, codigo } = verifyCodeSchema.parse(req.body);
      const result = await AuthService.verifyCode(email, codigo);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Redefinir senha
  static async resetPassword(req: Request, res: Response) {
    try {
      const { email, token, senha } = resetPasswordSchema.parse(req.body);
      const result = await AuthService.resetPassword(email, token, senha);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
