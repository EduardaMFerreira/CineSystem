import express, { Express, Request, Response } from "express";
import salaRoutes from "./routes/salaRoutes";
import filmeRoutes from "./routes/filmeRoutes";
import sessaoRoutes from "./routes/sessaoRoutes"; 
import { swaggerUi, swaggerSpec } from "./swagger";

const app: Express = express();
const port: number = 3000;

app.use(express.json());

// ✅ Rota do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota base
app.get("/", (req: Request, res: Response) => {
  res.send("API de Cinema está rodando 🎬");
});

// Rotas principais
app.use("/salas", salaRoutes);
app.use("/filmes", filmeRoutes);
app.use("/sessoes", sessaoRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📘 Swagger disponível em: http://localhost:${port}/api-docs`);
});
