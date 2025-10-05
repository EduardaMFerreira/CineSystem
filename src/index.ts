import express, { Express, Request, Response } from "express";
import salaRoutes from "./routes/salaRoutes";
import filmeRoutes from "./routes/filmeRoutes"; // 🆕 Importando as rotas de filmes

const app: Express = express();
const port: number = 3000;

app.use(express.json());

// Rota raiz — só pra verificar se o servidor está rodando
app.get("/", (req: Request, res: Response) => {
  res.send("API de Cinema está rodando 🎬");
});

// Rotas de Sala
app.use("/salas", salaRoutes);

// 🆕 Rotas de Filme
app.use("/filmes", filmeRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
