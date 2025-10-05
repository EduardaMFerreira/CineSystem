import { Router } from "express";
import * as sessaoController from "../controllers/sessaoController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessoes
 *   description: Endpoints de gerenciamento de sessões
 */

/**
 * @swagger
 * /sessoes:
 *   get:
 *     summary: Retorna todas as sessões
 *     tags: [Sessoes]
 *     responses:
 *       200:
 *         description: Lista de sessões retornada com sucesso
 */
router.get("/", sessaoController.getAll);

/**
 * @swagger
 * /sessoes/{id}:
 *   get:
 *     summary: Retorna uma sessão pelo ID
 *     tags: [Sessoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sessão encontrada
 *       404:
 *         description: Sessão não encontrada
 */
router.get("/:id", sessaoController.getById);

/**
 * @swagger
 * /sessoes:
 *   post:
 *     summary: Cria uma nova sessão (relacionada a um filme e uma sala)
 *     tags: [Sessoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               horario:
 *                 type: string
 *                 example: "2025-10-05T20:00:00Z"
 *               filmeId:
 *                 type: integer
 *               salaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Sessão criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", sessaoController.create);

/**
 * @swagger
 * /sessoes/{id}:
 *   put:
 *     summary: Atualiza uma sessão existente
 *     tags: [Sessoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               horario:
 *                 type: string
 *               filmeId:
 *                 type: integer
 *               salaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sessão atualizada com sucesso
 *       404:
 *         description: Sessão não encontrada
 */
router.put("/:id", sessaoController.update);

/**
 * @swagger
 * /sessoes/{id}:
 *   delete:
 *     summary: Remove uma sessão pelo ID
 *     tags: [Sessoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Sessão deletada com sucesso
 *       404:
 *         description: Sessão não encontrada
 */
router.delete("/:id", sessaoController.remove);

export default router;
