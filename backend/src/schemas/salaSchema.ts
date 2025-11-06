import { z } from "zod"; // Biblioteca de validação

// Schema de criação de sala
export const createSalaSchema = z.object({
  nome: z.string().min(1, "O nome da sala é obrigatório"), // Nome não pode ser vazio
  capacidade: z.number().int().positive("A capacidade deve ser positiva"), // Capacidade deve ser positiva
});

// Schema de atualização
export const updateSalaSchema = z.object({
  nome: z.string().min(1, "O nome não pode ser vazio").optional(),
  capacidade: z.number().int().positive("A capacidade deve ser positiva").optional(),
});

// Schema de resposta
export const salaResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
  capacidade: z.number(),
});
