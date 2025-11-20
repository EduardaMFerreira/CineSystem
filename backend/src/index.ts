import express, { Express, Request, Response } from "express";
import path from "path"; // <- necessário para arquivos estáticos
import salaRoutes from "./routes/salaRoutes";
import filmeRoutes from "./routes/filmeRoutes";
import sessaoRoutes from "./routes/sessaoRoutes";
import authRoutes from "./routes/authRoutes";
import reservaRoutes from "./routes/reservaRoutes";
import userRoutes from "./routes/userRoutes";
import { swaggerUi, swaggerSpec } from "./swagger";

const app: Express = express();
const port: number = 3000;

app.use(express.json());

// Servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota base
app.get("/", (req: Request, res: Response) => {
  res.send("API de Cinema está rodando 🎬");
});

// Rotas da aplicação
app.use("/salas", salaRoutes);
app.use("/filmes", filmeRoutes);
app.use("/sessoes", sessaoRoutes);
app.use("/auth", authRoutes);
app.use("/reservas", reservaRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📘 Swagger disponível em: http://localhost:${port}/api-docs`);
});
