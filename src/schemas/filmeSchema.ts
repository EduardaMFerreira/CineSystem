import { z } from "zod";

export const createFilmeSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  genero: z.string().min(1, "O gênero é obrigatório"),
  duracao: z.number().int().positive("A duração deve ser positiva"),
});

export const updateFilmeSchema = z.object({
  titulo: z.string().min(1, "O título não pode ser vazio").optional(),
  genero: z.string().min(1, "O gênero não pode ser vazio").optional(),
  duracao: z.number().int().positive("A duração deve ser positiva").optional(),
});

export const filmeResponseSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  genero: z.string(),
  duracao: z.number(),
});
