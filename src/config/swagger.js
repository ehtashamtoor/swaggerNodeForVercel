const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const SWAGGER_CDN = "https://unpkg.com/swagger-ui-dist@5.9.0";

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
        url:
          process.env.NODE_ENV === "production"
            ? "https://swagger-node-for-vercel.vercel.app" // production API base
            : "http://localhost:3000", // local dev API base
        description: "API server",
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
    swaggerUi.setup(swaggerSpec, {
      customCssUrl: [`${SWAGGER_CDN}/swagger-ui.css`],
      customJs: [
        `${SWAGGER_CDN}/swagger-ui-bundle.js`,
        `${SWAGGER_CDN}/swagger-ui-standalone-preset.js`,
      ],
      customSiteTitle: "Family Tree API",
    })
  );
};

module.exports = setupSwagger;
