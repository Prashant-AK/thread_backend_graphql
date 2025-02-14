import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
const PORT = Number(process.env.PORT) || 8000;

const init = async () => {
  const app = express();
  app.use(express.json());
  const graphqlServer = new ApolloServer({
    typeDefs: `
    type Query {
    hello:String
    }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello, GraphQL!",
      },
    },
  });
  await graphqlServer.start();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/graphql", cors(), express.json(), expressMiddleware(graphqlServer));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
