import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReservaService {
  /**
   * cria uma nova reserva com todas as validações necessárias
   */
  static async criarReserva(usuarioId: number, sessaoId: number) {
    // 1. validar se a sessão existe
    const sessao = await prisma.sessao.findUnique({
      where: { id: sessaoId },
      include: { sala: true },
    });

    if (!sessao) {
      return { error: "Sessão não encontrada" };
    }

    // 2. impedir reserva em sessão passada
    const agora = new Date();
    if (new Date(sessao.horario) < agora) {
      return { error: "Não é possível reservar uma sessão que já aconteceu" };
    }

    // 3. impedir reserva duplicada
    const reservaExistente = await prisma.reserva.findFirst({
      where: { usuarioId, sessaoId },
    });

    if (reservaExistente) {
      return { error: "Você já fez reserva para esta sessão" };
    }

    // 4. validar capacidade da sala
    const reservasCount = await prisma.reserva.count({
      where: { sessaoId },
    });

    if (reservasCount >= sessao.sala.capacidade) {
      return { error: "A sala está lotada para esta sessão" };
    }

    // 5. criar a reserva
    const reserva = await prisma.reserva.create({
      data: {
        usuarioId,
        sessaoId,
      },
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
    });

    return reserva;
  }

  /**
   * lista todas as reservas do usuário logado
   */
  static async listarReservasDoUsuario(usuarioId: number) {
    return prisma.reserva.findMany({
      where: { usuarioId },
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * deleta uma reserva pertencente ao usuário logado
   */
  static async deletarReserva(usuarioId: number, reservaId: number) {
    const reserva = await prisma.reserva.findUnique({
      where: { id: reservaId },
    });

    if (!reserva) {
      return { error: "Reserva não encontrada" };
    }

    // garantir que a reserva é do usuário
    if (reserva.usuarioId !== usuarioId) {
      return { error: "Você não tem permissão para cancelar esta reserva" };
    }

    await prisma.reserva.delete({
      where: { id: reservaId },
    });

    return { message: "Reserva cancelada com sucesso" };
  }
}
