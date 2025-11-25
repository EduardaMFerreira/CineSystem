import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas de autenticação (register e login)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Eduarda
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicita recuperação de senha
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *     responses:
 *       200:
 *         description: Código de verificação enviado
 */
router.post("/forgot-password", AuthController.forgotPassword);

/**
 * @swagger
 * /auth/verify-code:
 *   post:
 *     summary: Verifica código de recuperação
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - codigo
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *               codigo:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Código válido, retorna token para redefinir senha
 */
router.post("/verify-code", AuthController.verifyCode);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Redefine a senha do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - token
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               senha:
 *                 type: string
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 */
router.post("/reset-password", AuthController.resetPassword);

export default router;
