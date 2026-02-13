import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";

import {
  getMe,
  updateMe,
  updatePassword,
  getMyReservas,
  deleteMyReserva,
} from "../controllers/userController";

import { updateMeSchema, updatePasswordSchema } from "../schemas/userSchema";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints do usuário autenticado
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados retornados com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */
router.get("/me", authMiddleware, getMe);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMe'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
router.put("/me", authMiddleware, validate(updateMeSchema), updateMe);

/**
 * @swagger
 * /users/me/password:
 *   put:
 *     summary: Atualiza a senha do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassword'
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
router.put(
  "/me/password",
  authMiddleware,
  validate(updatePasswordSchema),
  updatePassword
);

/**
 * @swagger
 * /users/me/reservas:
 *   get:
 *     summary: Lista todas as reservas do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       401:
 *         description: Não autenticado
 */
router.get("/me/reservas", authMiddleware, getMyReservas);

/**
 * @swagger
 * /users/me/reservas/{id}:
 *   delete:
 *     summary: Deleta uma reserva do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva a ser deletada
 *     responses:
 *       200:
 *         description: Reserva deletada com sucesso
 *       400:
 *         description: Reserva não encontrada ou não autorizada
 *       401:
 *         description: Não autenticado
 */
router.delete("/me/reservas/:id", authMiddleware, deleteMyReserva);

export default router;
