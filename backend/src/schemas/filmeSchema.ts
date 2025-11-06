import { z } from "zod";

/**
 * Schema para criação de um novo filme.
 * 
 * - `titulo`: nome do filme; campo obrigatório e não pode ser vazio
 * - `genero`: categoria ou tipo do filme; campo obrigatório e não pode ser vazio
 * - `duracao`: duração do filme em minutos; deve ser um número inteiro e positivo
 */
export const createFilmeSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  genero: z.string().min(1, "O gênero é obrigatório"),
  duracao: z.number().int().positive("A duração deve ser positiva"),
});

/**
 * Schema para atualização de um filme existente.
 * 
 * - Todos os campos são opcionais, permitindo atualização parcial
 * - As mesmas validações do schema de criação se aplicam quando o campo é informado
 */
export const updateFilmeSchema = z.object({
  titulo: z.string().min(1, "O título não pode ser vazio").optional(),
  genero: z.string().min(1, "O gênero não pode ser vazio").optional(),
  duracao: z.number().int().positive("A duração deve ser positiva").optional(),
});

/**
 * Schema de resposta para um filme.
 * 
 * Define o formato dos dados retornados pela API:
 * - `id`: identificador único do filme
 * - `titulo`: nome do filme
 * - `genero`: gênero ou categoria
 * - `duracao`: duração total em minutos
 */
export const filmeResponseSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  genero: z.string(),
  duracao: z.number(),
});
