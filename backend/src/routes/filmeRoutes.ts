import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/filmeController";

const router = Router();


/**
 * Tag do Swagger para agrupar os endpoints de Filmes.
 *
 * - name: nome do grupo
 * - description: descrição geral do grupo de rotas
 */


/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: Endpoints de gerenciamento de filmes
 */


/**
 * Rota GET para retornar todos os filmes cadastrados.
 *
 * - Chama o controller `getAll`
 * - Retorna um array de objetos contendo informações dos filmes
 * - Resposta 200 em caso de sucesso
 */
router.get("/", getAll);

/**
 * Rota GET para buscar um filme específico pelo seu ID.
 *
 * - Chama o controller `getById`
 * - O parâmetro `id` é obrigatório na URL
 * - Retorna o filme correspondente se existir (200)
 * - Retorna 404 se o filme não for encontrado
 */
router.get("/:id", getById);

/**
 * Rota POST para cadastrar um novo filme.
 *
 * - Chama o controller `create`
 * - Recebe no corpo (body): `titulo`, `genero`, `duracao`
 * - Valida os dados antes de criar o registro
 * - Retorna 201 se o filme for criado com sucesso
 * - Retorna 400 em caso de erro de validação
 */
router.post("/", create);

/**
 * Rota PUT para atualizar um filme existente.
 *
 * - Chama o controller `update`
 * - O parâmetro `id` é obrigatório na URL
 * - O corpo (body) pode conter os campos a atualizar: `titulo`, `genero`, `duracao`
 * - Retorna 200 se a atualização for bem-sucedida
 * - Retorna 404 se o filme não existir
 */
router.put("/:id", update);

/**
 * Rota DELETE para remover um filme pelo seu ID.
 *
 * - Chama o controller `remove`
 * - O parâmetro `id` é obrigatório na URL
 * - Remove o filme permanentemente se existir
 * - Retorna 204 em caso de sucesso, ou 404 se não for encontrado
 */
router.delete("/:id", remove);

export default router;
