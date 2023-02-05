import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import { Controllers } from "./models";
import { swaggerDocs, options } from "./swagger";
import swaggerUi from "swagger-ui-express";
import database from "./database";
import { jwtAuth } from "./middleware";

(async () => {
  //바로 실행되는 함수
  const app = express();
  await database.$connect();

  //미들웨어
  app.use(
    cors({
      origin: "*",
    })
  );
  jwtAuth();
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "700mb" }));
  app.use(jwtAuth);
  Controllers.forEach((controller) => {
    app.use(controller.path, controller.router);
  });

  app.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocs);
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, options));

  app.get("/", (req, res) => {
    res.send("hello!????");
  });
  app.use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .json({ message: err.message || "서버에서 에러가 발생하였습니다" });
  });
  app.listen(8080, () => {
    console.log("express서버가 실행되었습니다");
  });
})();
