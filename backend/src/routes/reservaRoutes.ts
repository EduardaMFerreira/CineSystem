import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Rotas de reservas de ingressos
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Cria uma nova reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessaoId
 *               - quantidade
 *             properties:
 *               sessaoId:
 *                 type: string
 *                 example: 1
 *               quantidade:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/", (req, res) => {
  res.send("Criar reserva");
});

/**
 * @swagger
 * /reservas/minhas:
 *   get:
 *     summary: Retorna as reservas do usuário logado
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sessaoId:
 *                     type: string
 *                   quantidade:
 *                     type: number
 *                   dataReserva:
 *                     type: string
 *                     example: 2025-11-20T10:00:00Z
 *       401:
 *         description: Não autorizado
 */
router.get("/minhas", (req, res) => {
  res.send("Minhas reservas");
});

export default router;
