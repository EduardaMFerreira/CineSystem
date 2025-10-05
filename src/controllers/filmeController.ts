import { Request, Response } from 'express';
import { filmeService } from '../services/filmeService';

export const filmeController = {
  getAll: async (req: Request, res: Response) => {
    const filmes = await filmeService.getAll();
    res.json(filmes);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const filme = await filmeService.getById(id);

    if (!filme) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    res.json(filme);
  },

  create: async (req: Request, res: Response) => {
    const { titulo, genero, duracao } = req.body;

    if (!titulo || !genero || !duracao) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
    }

    const novoFilme = await filmeService.create({ titulo, genero, duracao });
    res.status(201).json(novoFilme);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { titulo, genero, duracao } = req.body;

    try {
      const filmeAtualizado = await filmeService.update(id, { titulo, genero, duracao });
      res.json(filmeAtualizado);
    } catch (error) {
      res.status(404).json({ message: 'Filme não encontrado para atualização.' });
    }
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await filmeService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: 'Filme não encontrado para exclusão.' });
    }
  },
};
