import { z } from "zod";

/**
 * Schema para criação de uma nova sessão.
 * 
 * - `horario`: string que representa a data/hora da sessão; validada para ser uma data válida
 * - `filmeId`: ID do filme associado à sessão, deve ser número inteiro positivo
 * - `salaId`: ID da sala associada à sessão, deve ser número inteiro positivo
 */
export const createSessaoSchema = z.object({
  horario: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data e hora inválidas",
  }),
  filmeId: z.number().int().positive("FilmeId inválido"),
  salaId: z.number().int().positive("SalaId inválido"),
});

/**
 * Schema para atualização de uma sessão existente.
 * 
 * - Todos os campos são opcionais, permitindo atualização parcial
 * - Mesmas validações do schema de criação se aplicam
 */
export const updateSessaoSchema = z.object({
  horario: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data e hora inválidas",
  }).optional(),
  filmeId: z.number().int().positive("FilmeId inválido").optional(),
  salaId: z.number().int().positive("SalaId inválido").optional(),
});

/**
 * Schema de resposta para uma sessão.
 * 
 * Define o formato que a API retornará para os clientes:
 * - `id`: identificador da sessão
 * - `horario`: data/hora da sessão em formato string
 * - `filme`: objeto com dados do filme associado
 * - `sala`: objeto com dados da sala associada
 */
export const sessaoResponseSchema = z.object({
  id: z.number(),
  horario: z.string(),
  filme: z.object({
    id: z.number(),
    titulo: z.string(),
    genero: z.string(),
    duracao: z.number(),
  }),
  sala: z.object({
    id: z.number(),
    nome: z.string(),
    capacidade: z.number(),
  }),
});
