import defaultSwagger from "./defaultSwagger";
import { Swaggers } from "../models";

// console.log(Swaggers);
const { paths } = Object.values(Swaggers).reduce(
  (acc, apis) => {
    const APIs = Object.values(apis).map((api) => {
      // console.log(api);
      return { ...api };
    });
    // console.log(APIs);
    APIs.forEach((api) => {
      const key = Object.keys(api)[0];
      // console.log(api);
      if (!acc.paths[key]) {
        //같은 endpoint에 다른 http메서드가 들어갈 수 있으므로
        acc.paths = {
          ...acc.paths,
          ...api,
        };
      } else {
        acc.paths[key] = {
          ...acc.paths[key],
          ...api[key],
        };
      }
    });
    // console.log(acc);
    return acc;
  },
  { paths: {} }
);

export const swaggerDocs = {
  ...defaultSwagger,
  paths,
};

export const options = {
  swaggerOptions: {
    url: "/swagger.json",
  },
};
