import { z } from "zod";

export const updateMeSchema = z.object({
  nome: z.string().min(2, "Nome inválido").optional(),
  email: z.string().email("Email inválido").optional(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Senha atual inválida"),
  newPassword: z.string().min(6, "Nova senha deve ter no mínimo 6 caracteres"),
});
