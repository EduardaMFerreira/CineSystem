import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

/**
 * Configuração do Swagger (OpenAPI 3.0) para a API de Cinema
 */
const options = {
  definition: {
    openapi: "3.0.0", // Versão do padrão OpenAPI
    info: {
      title: "🎬 API - Sistema de Cinema", // Título exibido na documentação
      version: "1.0.0",                   // Versão da API
      description: "Documentação da API de Cinema (Filmes, Salas e Sessões)", // Descrição geral
    },
    servers: [
      {
        url: "http://localhost:3000", // URL base da API
      },
    ],
  },
  // Arquivos onde estão os comentários Swagger nas rotas
  apis: ["./src/routes/*.ts"],
};

// Gera a especificação Swagger a partir das configurações acima
const swaggerSpec = swaggerJSDoc(options);

/**
 * Exporta o Swagger UI e a especificação gerada
 * - `swaggerUi` → middleware que fornece a interface web interativa
 * - `swaggerSpec` → JSON usado pelo Swagger UI para exibir a documentação
 */
export { swaggerUi, swaggerSpec };
