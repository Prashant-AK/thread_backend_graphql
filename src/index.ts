import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { createAppoloGraphqlServer } from "./graphql";
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
    expressMiddleware(await createAppoloGraphqlServer())
  );
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
