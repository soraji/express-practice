const defaultSwagger = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "스웨거",
    description: "스웨거 sample페이지",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export default defaultSwagger;
