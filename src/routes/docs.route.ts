import { Router } from "express";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs");

const router = Router();
router.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss:
      ".swagger-ui .topbar { display: none } #swagger-ui {max-width: 960px; margin: auto } .swagger-ui .info .base-url { margin-top: 8px; font-size: 24px } .live-responses-table { width: 100%; border-collapse: collapse; background: #e4ffbf; display: table-cell; padding: 10px!important; }",
    customSiteTitle: "API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

export default router;
