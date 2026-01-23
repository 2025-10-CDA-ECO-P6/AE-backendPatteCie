import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vet API",
      version: "1.0.0",
      description: "Documentation de l'API Pattes & Cie",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Serveur local",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerJsdoc(options);
