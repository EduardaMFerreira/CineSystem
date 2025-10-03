import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API de Cinema está rodando 🎬");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
