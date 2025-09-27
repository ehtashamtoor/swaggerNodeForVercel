const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Family Tree API",
      version: "1.0.0",
      description: "API documentation for the Family Tree MVP (MERN stack)",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
      {
        url: "https://backend-family-tree.vercel.app/api",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { customCssUrl: CSS_URL })
  );
};

module.exports = setupSwagger;
