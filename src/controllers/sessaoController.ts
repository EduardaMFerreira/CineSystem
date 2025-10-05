import { Request, Response } from "express";
import * as sessaoService from "../services/sessaoService";
import { createSessaoSchema, updateSessaoSchema, sessaoResponseSchema } from "../schemas/sessaoSchema";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  try {
    const sessoes = await sessaoService.getAllSessoes();
    const sessoesArray = Array.isArray(sessoes) ? sessoes : [];

    const sessoesFormatadas = sessoesArray.map(sessao => ({
      ...sessao,
      horario: sessao.horario.toISOString(),
    }));

    const response = z.array(sessaoResponseSchema).parse(sessoesFormatadas);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar sessões", error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const sessao = await sessaoService.getSessaoById(id);
    if (!sessao) return res.status(404).json({ message: "Sessão não encontrada" });

    const sessaoFormatada = { ...sessao, horario: sessao.horario.toISOString() };
    res.json(sessaoResponseSchema.parse(sessaoFormatada));
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar sessão", error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  const parsed = createSessaoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });

  try {
    const novaSessao = await sessaoService.createSessao(parsed.data);
    const sessaoFormatada = { ...novaSessao, horario: novaSessao.horario.toISOString() };
    res.status(201).json(sessaoResponseSchema.parse(sessaoFormatada));
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar sessão", error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parsed = updateSessaoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });

  try {
    const sessaoAtualizada = await sessaoService.updateSessao(id, parsed.data);
    if (!sessaoAtualizada) return res.status(404).json({ message: "Sessão não encontrada para atualização." });

    const sessaoFormatada = { ...sessaoAtualizada, horario: sessaoAtualizada.horario.toISOString() };
    res.json(sessaoResponseSchema.parse(sessaoFormatada));
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar sessão", error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const deletado = await sessaoService.deleteSessao(id);
    if (!deletado) return res.status(404).json({ message: "Sessão não encontrada para exclusão." });

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao deletar sessão", error: error.message });
  }
};
