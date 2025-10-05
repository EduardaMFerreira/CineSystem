import { z } from "zod";

export const createSalaSchema = z.object({
  nome: z.string().min(1, "O nome da sala é obrigatório"),
  capacidade: z.number().int().positive("A capacidade deve ser positiva"),
});

export const updateSalaSchema = z.object({
  nome: z.string().min(1, "O nome não pode ser vazio").optional(),
  capacidade: z.number().int().positive("A capacidade deve ser positiva").optional(),
});

export const salaResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
  capacidade: z.number(),
});
