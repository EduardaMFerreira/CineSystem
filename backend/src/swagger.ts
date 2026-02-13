import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

/**
 * Configuração completa do Swagger (OpenAPI 3.0)
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
    // ✨  Adicionando o servidor de produção ✨
    servers: [
      { 
        url: "https://cinesystem.onrender.com", // 🚀 URL DE PRODUÇÃO
        description: "Servidor de Produção (Render)" 
      },
      { 
        url: "http://localhost:3000",          // URL DE DESENVOLVIMENTO
        description: "Servidor Local" 
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      /**
       * SCHEMAS DO SISTEMA
       */
      schemas: {
        /** Usuário logado */
        User: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            nome: { type: "string", example: "Eduarda Silva" },
            email: { type: "string", example: "eduarda@email.com" },
            criadoEm: { type: "string", format: "date-time" },
            atualizadoEm: { type: "string", format: "date-time" },
          },
        },

        /** Atualizar perfil */
        UpdateMe: {
          type: "object",
          properties: {
            nome: {
              type: "string",
              example: "Maria Souza",
            },
            email: {
              type: "string",
              format: "email",
              example: "maria@email.com",
            },
          },
        },

        /** Atualizar senha */
        UpdatePassword: {
          type: "object",
          required: ["senhaAtual", "novaSenha"],
          properties: {
            senhaAtual: {
              type: "string",
              example: "123456",
            },
            novaSenha: {
              type: "string",
              example: "654321",
            },
          },
        },

        /** Reserva do usuário */
        Reserva: {
          type: "object",
          properties: {
            id: { type: "number", example: 33 },
            sessaoId: { type: "number", example: 4 },
            poltrona: { type: "string", example: "C7" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },

  // Lê automaticamente TODOS os arquivos de rota
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };