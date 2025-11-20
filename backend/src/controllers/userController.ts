import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userService } from "../services/userService";
import { ReservaService } from "../services/reservaService";

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const user = await userService.getById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    return res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
    });
  } catch {
    return res.status(500).json({ message: "Erro ao buscar usuário" });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { nome, email } = req.body;

    const updated = await userService.update(userId, { nome, email });

    return res.json({
      message: "Perfil atualizado com sucesso",
      user: {
        id: updated.id,
        nome: updated.nome,
        email: updated.email,
      },
    });
  } catch {
    return res.status(500).json({ message: "Erro ao atualizar perfil" });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await userService.getById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const passwordMatch = await bcrypt.compare(currentPassword, user.senha);
    if (!passwordMatch)
      return res.status(400).json({ message: "Senha atual incorreta" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await userService.updatePassword(userId, hashed);

    return res.json({ message: "Senha atualizada com sucesso" });
  } catch {
    return res.status(500).json({ message: "Erro ao atualizar senha" });
  }
};

export const getMyReservas = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const reservas = await ReservaService.listarReservasDoUsuario(userId);
    return res.json(reservas);
  } catch {
    return res.status(500).json({ message: "Erro ao buscar reservas" });
  }
};

// ---------------------------
// NOVO: Deletar reserva do usuário
// ---------------------------
export const deleteMyReserva = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const reservaId = Number(req.params.id);

    const result = await ReservaService.deletarReserva(reservaId, userId);

    if (result.error) return res.status(400).json({ message: result.error });

    return res.json({ message: result.message });
  } catch {
    return res.status(500).json({ message: "Erro ao deletar reserva" });
  }
};
