import { Request, Response } from "express";
import * as salaService from "../services/salaService";

export const getAll = async (req: Request, res: Response) => {
  const salas = await salaService.getAllSalas();
  res.json(salas);
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sala = await salaService.getSalaById(id);
  if (!sala) return res.status(404).json({ error: "Sala não encontrada" });
  res.json(sala);
};

export const create = async (req: Request, res: Response) => {
  const sala = await salaService.createSala(req.body);
  res.status(201).json(sala);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sala = await salaService.updateSala(id, req.body);
  res.json(sala);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await salaService.deleteSala(id);
  res.status(204).send();
};
