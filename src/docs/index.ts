module.exports = {
  openapi: "3.0.1",
  info: {
    title: "Express API with Swagger",
    version: "1.0.0",
    description: "API Documentation",
  },
  host: "localhost:8000",
  license: {
    name: "MIT",
    url: "https://opensource.org/licenses/MIT",
  },
  basePath: "/",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    ...require("../services/post/docs"),
  },
};
