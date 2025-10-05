import express, { Express, Request, Response } from "express";
import salaRoutes from "./routes/salaRoutes";
import filmeRoutes from "./routes/filmeRoutes";
import sessaoRoutes from "./routes/sessaoRoutes"; 

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API de Cinema está rodando 🎬");
});

app.use("/salas", salaRoutes);

app.use("/filmes", filmeRoutes);

app.use("/sessoes", sessaoRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
