import { z } from "zod";

/**
 * Schema para criação de um novo filme.
 * - `titulo`: obrigatório
 * - `genero`: obrigatório
 * - `duracao`: obrigatório, inteiro positivo
 * - `bannerUrl`: obrigatório, URL válida
 */
export const createFilmeSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  genero: z.string().min(1, "O gênero é obrigatório"),
  duracao: z.number().int().positive("A duração deve ser positiva"),
  bannerUrl: z.string().url("bannerUrl deve ser uma URL válida"),
});

/**
 * Schema para atualização de um filme existente.
 * - Todos os campos são opcionais, exceto bannerUrl que agora é obrigatório
 */
export const updateFilmeSchema = z.object({
  titulo: z.string().min(1, "O título não pode ser vazio").optional(),
  genero: z.string().min(1, "O gênero não pode ser vazio").optional(),
  duracao: z.number().int().positive("A duração deve ser positiva").optional(),
  bannerUrl: z.string().url("bannerUrl deve ser uma URL válida"),
});

/**
 * Schema de resposta de um filme.
 * Inclui bannerUrl obrigatório
 */
export const filmeResponseSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  genero: z.string(),
  duracao: z.number(),
  bannerUrl: z.string().url(),
});
