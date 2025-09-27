const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// const CSS_URL =
//   "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const SWAGGER_CDN_URL = "https://unpkg.com/swagger-ui-dist@5.9.0";

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
  const swaggerUiOptions = {
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .information-container { background: #fafafa; padding: 20px; }
    `,
    customCssUrl: `${SWAGGER_CDN_URL}/swagger-ui.css`,
    customJs: [
      `${SWAGGER_CDN_URL}/swagger-ui-bundle.js`,
      `${SWAGGER_CDN_URL}/swagger-ui-standalone-preset.js`,
    ],
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  };
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );
};

module.exports = setupSwagger;
