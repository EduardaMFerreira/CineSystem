import { Request, Response } from "express";
import * as salaService from "../services/salaService";
import { createSalaSchema, updateSalaSchema, salaResponseSchema } from "../schemas/salaSchema";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  try {
    const salas = await salaService.getAllSalas();
    const salasArray = Array.isArray(salas) ? salas : [];
    const response = z.array(salaResponseSchema).parse(salasArray);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar salas", error: error.message });
  }
};


export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const sala = await salaService.getSalaById(id);
    if (!sala) return res.status(404).json({ message: "Sala não encontrada" });

    res.json(salaResponseSchema.parse(sala));
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar sala", error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  const parsed = createSalaSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });

  const sala = await salaService.createSala(parsed.data);
  res.status(201).json(salaResponseSchema.parse(sala));
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parsed = updateSalaSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });

  try {
    const salaAtualizada = await salaService.updateSala(id, parsed.data);
    if (!salaAtualizada) return res.status(404).json({ message: "Sala não encontrada para atualização." });

    res.json(salaResponseSchema.parse(salaAtualizada));
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar sala", error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const deletado = await salaService.deleteSala(id);
    if (!deletado) return res.status(404).json({ message: "Sala não encontrada para exclusão." });

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao deletar sala", error: error.message });
  }
};
