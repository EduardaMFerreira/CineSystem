import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/filmeController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: Endpoints de gerenciamento de filmes
 */

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Retorna todos os filmes
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
 */
router.get("/", getAll);

/**
 * @swagger
 * /filmes/{id}:
 *   get:
 *     summary: Retorna um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme encontrado
 *       404:
 *         description: Filme não encontrado
 */
router.get("/:id", getById);

/**
 * @swagger
 * /filmes:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Filmes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - genero
 *               - duracao
 *               - bannerUrl
 *             properties:
 *               titulo:
 *                 type: string
 *               genero:
 *                 type: string
 *               duracao:
 *                 type: number
 *               bannerUrl:
 *                 type: string
 *                 description: URL obrigatória do banner do filme
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", create);

/**
 * @swagger
 * /filmes/{id}:
 *   put:
 *     summary: Atualiza um filme existente
 *     tags: [Filmes]
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
 *             required:
 *               - bannerUrl
 *             properties:
 *               titulo:
 *                 type: string
 *               genero:
 *                 type: string
 *               duracao:
 *                 type: number
 *               bannerUrl:
 *                 type: string
 *                 description: URL obrigatória do banner do filme
 *     responses:
 *       200:
 *         description: Filme atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Filme não encontrado
 */
router.put("/:id", update);

/**
 * @swagger
 * /filmes/{id}:
 *   delete:
 *     summary: Remove um filme
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Filme removido com sucesso
 *       404:
 *         description: Filme não encontrado
 */
router.delete("/:id", remove);

export default router;
