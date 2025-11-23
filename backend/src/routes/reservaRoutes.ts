import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  criarReserva,
  listarMinhasReservas,
  cancelarReserva,
} from "../controllers/reservaController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Operações relacionadas a reservas de sessões
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Criar uma nova reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessaoId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *       400:
 *         description: Erro de validação ou regras de negócio
 *       401:
 *         description: Não autenticado
 */
router.post("/", authMiddleware, criarReserva);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Listar reservas do usuário logado
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas do usuário
 *       401:
 *         description: Não autenticado
 */
router.get("/", authMiddleware, listarMinhasReservas);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Cancelar uma reserva do usuário logado
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da reserva a ser cancelada
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva cancelada com sucesso
 *       400:
 *         description: Erro de validação ou reserva não pertence ao usuário
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Reserva não encontrada
 */
router.delete("/:id", authMiddleware, cancelarReserva);

export default router;
