import express, { Express, Request, Response } from "express";
import salaRoutes from "./routes/salaRoutes";
import filmeRoutes from "./routes/filmeRoutes";
import sessaoRoutes from "./routes/sessaoRoutes"; 
import { swaggerUi, swaggerSpec } from "./swagger";

const app: Express = express();
const port: number = 3000;

// Middleware para interpretar requisições JSON
app.use(express.json());

/**
 * Rota do Swagger para documentação da API.
 *
 * - URL: /api-docs
 * - Utiliza `swaggerUi.serve` e `swaggerUi.setup` para servir a interface Swagger
 * - Permite visualizar todas as rotas, parâmetros e schemas definidos
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Rota base da API.
 *
 * - URL: /
 * - Método: GET
 * - Retorna uma mensagem simples indicando que a API está rodando
 */
app.get("/", (req: Request, res: Response) => {
  res.send("API de Cinema está rodando 🎬");
});

/**
 * Rotas principais da aplicação.
 *
 * - `/salas` → rotas relacionadas a salas de cinema (CRUD)
 * - `/filmes` → rotas relacionadas a filmes (CRUD)
 * - `/sessoes` → rotas relacionadas a sessões de cinema (CRUD)
 */
app.use("/salas", salaRoutes);
app.use("/filmes", filmeRoutes);
app.use("/sessoes", sessaoRoutes);

/**
 * Inicializa o servidor Express.
 *
 * - Porta definida em `port`
 * - Mostra no console que o servidor está rodando e o link do Swagger
 */
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📘 Swagger disponível em: http://localhost:${port}/api-docs`);
});
