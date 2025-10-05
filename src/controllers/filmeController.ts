import { Request, Response } from "express";
import { filmeService } from "../services/filmeService";
import { createFilmeSchema, updateFilmeSchema, filmeResponseSchema } from "../schemas/filmeSchema";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  try {
    const filmes = await filmeService.getAll();
    const response = z.array(filmeResponseSchema).parse(filmes);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar filmes", error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const filme = await filmeService.getById(id);
  if (!filme) return res.status(404).json({ message: "Filme não encontrado" });

  res.json(filmeResponseSchema.parse(filme));
};

export const create = async (req: Request, res: Response) => {
  const parsed = createFilmeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });

  const novoFilme = await filmeService.create(parsed.data);
  res.status(201).json(filmeResponseSchema.parse(novoFilme));
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parsed = updateFilmeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });

  try {
    const filmeAtualizado = await filmeService.update(id, parsed.data);
    res.json(filmeResponseSchema.parse(filmeAtualizado));
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar filme", error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await filmeService.delete(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao deletar filme", error: error.message });
  }
};
