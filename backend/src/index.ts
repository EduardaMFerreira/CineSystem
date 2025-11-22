import express, { Express, Request, Response } from "express";
import cors from "cors"; 
import path from "path";
import salaRoutes from "./routes/salaRoutes";
import filmeRoutes from "./routes/filmeRoutes";
import sessaoRoutes from "./routes/sessaoRoutes";
import authRoutes from "./routes/authRoutes";
import reservaRoutes from "./routes/reservaRoutes";
import userRoutes from "./routes/userRoutes";
import { swaggerUi, swaggerSpec } from "./swagger";

const app: Express = express();
const port: number = 3000;

app.use(cors()); // <-- ESSA LINHA RESOLVE O CORS

app.use(express.json());

// Servir uploads (se usar futuramente)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Servir banners (public/banners)
app.use("/public", express.static(path.join(__dirname, "..", "public")));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota base
app.get("/", (req: Request, res: Response) => {
  res.send("API de Cinema está rodando 🎬");
});

// Rotas
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
