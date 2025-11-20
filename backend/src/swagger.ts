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
      description:
        "Documentação da API de Cinema (Filmes, Salas, Sessões, Autenticação e Reservas)",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  // Agora funciona independente de build/diretório
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
