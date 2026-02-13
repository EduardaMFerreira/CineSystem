import { Router } from "express";
import * as salaController from "../controllers/salaController";

const router = Router(); // Cria instância de rotas

/**
 * @swagger
 * tags:
 *   name: Salas
 *   description: Endpoints de gerenciamento de salas
 */

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Retorna todas as salas
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de salas retornada com sucesso
 */
router.get("/", salaController.getAll);

/**
 * @swagger
 * /salas/{id}:
 *   get:
 *     summary: Retorna uma sala pelo ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sala encontrada
 *       404:
 *         description: Sala não encontrada
 */
router.get("/:id", salaController.getById);

/**
 * @swagger
 * /salas:
 *   post:
 *     summary: Cria uma nova sala
 *     tags: [Salas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", salaController.create);

/**
 * @swagger
 * /salas/{id}:
 *   put:
 *     summary: Atualiza uma sala existente
 *     tags: [Salas]
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
 *               nome:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso
 *       404:
 *         description: Sala não encontrada
 */
router.put("/:id", salaController.update);

/**
 * @swagger
 * /salas/{id}:
 *   delete:
 *     summary: Remove uma sala pelo ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Sala deletada com sucesso
 *       404:
 *         description: Sala não encontrada
 */
router.delete("/:id", salaController.remove);

export default router;
