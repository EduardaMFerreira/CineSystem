import { Router } from "express";
import * as sessaoController from "../controllers/sessaoController";

const router = Router();

/**
 * Tag do Swagger para agrupar os endpoints de Sessões.
 * 
 * - name: nome do grupo
 * - description: descrição geral do grupo de rotas
 */
 
/**
 * @swagger
 * tags:
 *   name: Sessoes
 *   description: Endpoints de gerenciamento de sessões
 */

/**
 * Rota GET para retornar todas as sessões.
 * 
 * - Chama o controller `getAll`
 * - Retorna um array de sessões no formato definido pelo schema
 */
router.get("/", sessaoController.getAll);

/**
 * Rota GET para retornar uma sessão específica pelo ID.
 * 
 * - Chama o controller `getById`
 * - Parâmetro `id` obrigatório na URL
 * - Retorna 200 se encontrada, 404 caso contrário
 */
router.get("/:id", sessaoController.getById);

/**
 * Rota POST para criar uma nova sessão.
 * 
 * - Chama o controller `create`
 * - Recebe no body: `horario`, `filmeId` e `salaId`
 * - Valida os dados antes de criar
 * - Retorna 201 se criada com sucesso, 400 se houver erro de validação
 */
router.post("/", sessaoController.create);

/**
 * Rota PUT para atualizar uma sessão existente pelo ID.
 * 
 * - Chama o controller `update`
 * - Parâmetro `id` obrigatório na URL
 * - Recebe no body os campos a atualizar (`horario`, `filmeId`, `salaId`)
 * - Retorna 200 se atualizado com sucesso, 404 se não existir
 */
router.put("/:id", sessaoController.update);

/**
 * Rota DELETE para remover uma sessão pelo ID.
 * 
 * - Chama o controller `remove`
 * - Parâmetro `id` obrigatório na URL
 * - Retorna 204 se removida com sucesso, 404 se não existir
 */
router.delete("/:id", sessaoController.remove);

export default router;
