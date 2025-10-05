import { z } from "zod";

export const createSessaoSchema = z.object({
  horario: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data e hora inválidas",
  }),
  filmeId: z.number().int().positive("FilmeId inválido"),
  salaId: z.number().int().positive("SalaId inválido"),
});

export const updateSessaoSchema = z.object({
  horario: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data e hora inválidas",
  }).optional(),
  filmeId: z.number().int().positive("FilmeId inválido").optional(),
  salaId: z.number().int().positive("SalaId inválido").optional(),
});

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
