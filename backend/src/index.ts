import express, { Express, Request, Response } from "express";
import cors from "cors"; 
import path from "path";
import salaRoutes from "./routes/salaRoutes";
import filmeRoutes from "./routes/filmeRoutes";
import sessaoRoutes from "./routes/sessaoRoutes";
import authRoutes from "./routes/authRoutes";
import reservaRoutes from "./routes/reservaRoutes";
import userRoutes from "./routes/userRoutes";
import { swaggerUi, swaggerSpec } from "./swagger"; // Arquivo de configuração do Swagger

const app: Express = express();

// ⭐ Porta dinâmica (Render exige isso)
const port = process.env.PORT || 3000;

// Obtém a URL base do ambiente (Render) ou usa o localhost
// Use esta variável para construir URLs no seu código (ex: bannerUrl)
const BASE_URL = process.env.BASE_URL || `http://localhost:${port}`; 

app.use(cors());
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
    console.log(`🚀 Servidor rodando em: ${BASE_URL}`); // Usa a URL base correta aqui
    console.log(`📘 Swagger disponível em: ${BASE_URL}/api-docs`); // Usa a URL base correta aqui
});