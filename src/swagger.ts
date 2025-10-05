import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "🎬 API - Sistema de Cinema",
      version: "1.0.0",
      description: "Documentação da API de Cinema (Filmes, Salas e Sessões)",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Caminho dos arquivos com as rotas documentadas
};

const swaggerSpec = swaggerJSDoc(options);

// 👇 aqui está o que faltava!
export { swaggerUi, swaggerSpec };
