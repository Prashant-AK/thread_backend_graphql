import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { createAppoloGraphqlServer } from "./graphql";
import UserService from "./services/user";
import { Context } from "./graphql/user/resolvers";

const PORT = Number(process.env.PORT) || 8000;

const init = async () => {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(await createAppoloGraphqlServer(), {
      // @ts-ignore
      context: async ({ req, res }): Promise<Context> => {
        try {
          const token = req.headers["token"];
          const user = UserService.decodeJWTToken(token as string);

          return { user };
        } catch (error) {
          console.error(error);
        }
      },
    })
  );
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
