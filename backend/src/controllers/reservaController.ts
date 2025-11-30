import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ReservaService } from "../services/reservaService";

/**
 * Criar uma nova reserva
 */
export const criarReserva = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.userId;
    const { sessaoId } = req.body;

    if (!usuarioId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    if (!sessaoId) {
      return res.status(400).json({ message: "sessaoId é obrigatório" });
    }

    const resultado = await ReservaService.criarReserva(usuarioId, Number(sessaoId));

    if ("error" in resultado) {
      return res.status(400).json({ message: resultado.error });
    }

    return res.status(201).json({
      message: "Reserva criada com sucesso",
      reserva: resultado,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Listar reservas do usuário logado
 */
export const listarMinhasReservas = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.userId;

    if (!usuarioId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const reservas = await ReservaService.listarReservasDoUsuario(usuarioId);

    return res.json(reservas);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Cancelar reserva do usuário logado
 */
export const cancelarReserva = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.userId;
    const reservaId = Number(req.params.id);

    if (!usuarioId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    // Passar na ordem correta: deletarReserva(usuarioId, reservaId)
    const resultado = await ReservaService.deletarReserva(usuarioId, reservaId);

    if ("error" in resultado) {
      return res.status(400).json({ message: resultado.error });
    }

    return res.status(200).json({ message: resultado.message });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
