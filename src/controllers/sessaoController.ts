import { Request, Response } from "express";
import * as sessaoService from "../services/sessaoService";

export const getAll = async (req: Request, res: Response) => {
  const sessoes = await sessaoService.getAllSessoes();
  res.json(sessoes);
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sessao = await sessaoService.getSessaoById(id);
  if (!sessao) return res.status(404).json({ message: "Sessão não encontrada" });
  res.json(sessao);
};

export const create = async (req: Request, res: Response) => {
  const { horario, filmeId, salaId } = req.body;

  if (!horario || !filmeId || !salaId) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios: horario, filmeId e salaId." });
  }

  try {
    const novaSessao = await sessaoService.createSessao({
      horario,
      filmeId,
      salaId,
    });
    res.status(201).json(novaSessao);
  } catch (error: any) {
    res.status(400).json({ message: "Erro ao criar sessão", error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { horario, filmeId, salaId } = req.body;

  try {
    const sessaoAtualizada = await sessaoService.updateSessao(id, {
      horario,
      filmeId,
      salaId,
    });
    res.json(sessaoAtualizada);
  } catch (error: any) {
    res.status(404).json({ message: "Sessão não encontrada para atualização." });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await sessaoService.deleteSessao(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ message: "Sessão não encontrada para exclusão." });
  }
};
