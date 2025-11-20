import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReservaService {
  /**
   * Cria uma nova reserva vinculada a um usuário e sessão.
   */
  static async criarReserva(usuarioId: number, sessaoId: number) {
    const sessao = await prisma.sessao.findUnique({ where: { id: sessaoId } });
    if (!sessao) throw new Error("Sessão não encontrada");

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
   * Lista todas as reservas de um usuário.
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
   * Deleta (cancela) uma reserva específica do usuário.
   */
  static async deletarReserva(reservaId: number, usuarioId: number) {
    const reserva = await prisma.reserva.findUnique({ where: { id: reservaId } });

    if (!reserva) {
      return { error: "Reserva não encontrada" };
    }

    if (reserva.usuarioId !== usuarioId) {
      return { error: "Não autorizado a deletar esta reserva" };
    }

    await prisma.reserva.delete({ where: { id: reservaId } });
    return { message: "Reserva deletada com sucesso" };
  }
}
