import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

/**
 * Configuração do Swagger (OpenAPI 3.0) para a API de Cinema
 */
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
  // Caminho absoluto para garantir que o Swagger encontre os arquivos
  apis: [path.join(__dirname, "routes/*.ts")],
};

// Gera a especificação Swagger a partir das configurações
const swaggerSpec = swaggerJSDoc(options);

// Exporta os objetos necessários
export { swaggerUi, swaggerSpec };
