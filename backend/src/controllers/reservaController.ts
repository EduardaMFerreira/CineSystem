import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ReservaService } from "../services/reservaService";

/**
 * Cria uma nova reserva para o usuário logado
 */
export const criarReserva = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.userId;
    const { sessaoId } = req.body;

    if (!usuarioId) return res.status(401).json({ message: "Usuário não autenticado" });
    if (!sessaoId) return res.status(400).json({ message: "sessaoId é obrigatório" });

    const reserva = await ReservaService.criarReserva(usuarioId, sessaoId);
    res.status(201).json(reserva);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Lista todas as reservas do usuário logado
 */
export const listarMinhasReservas = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.userId;
    if (!usuarioId) return res.status(401).json({ message: "Usuário não autenticado" });

    const reservas = await ReservaService.listarReservasDoUsuario(usuarioId);
    res.json(reservas);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Cancela uma reserva do usuário logado
 */
export const cancelarReserva = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.userId;
    const reservaId = Number(req.params.id);

    if (!usuarioId) return res.status(401).json({ message: "Usuário não autenticado" });

    const deletado = await ReservaService.deletarReserva(usuarioId, reservaId);
    if (!deletado) return res.status(404).json({ message: "Reserva não encontrada" });

    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
