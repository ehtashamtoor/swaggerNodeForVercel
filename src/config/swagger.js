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
      // {
      //   url: "http://localhost:3000/api",
      //   description: "Local server",
      // },
      // {
      //   url: "https://backend-family-tree.vercel.app/api-docs",
      //   description: "Production server",
      // },
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
      customCssUrl: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
      ],
      customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
      ],
      customSiteTitle: "Family Tree API",
    })
  );
};

module.exports = setupSwagger;
