import { Application } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const setupSwagger = (app: Application) => {
  const options: Options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        version: "1.0.0",
      },
    },
    apis: ["./src/routes/*.routes.ts"], // Ruta donde se encuentran tus archivos de rutas
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
