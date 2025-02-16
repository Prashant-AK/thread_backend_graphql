import { ApolloServer } from "@apollo/server";
import { Users } from "./user";
export const createAppoloGraphqlServer = async () => {
  const graphqlServer = new ApolloServer({
    // typeDefs: `
    // type Query {
    //   ${Users.queries}
    // }
    //   type Mutation{
    //   ${Users.mutations}
    //   }
    // `,
    typeDefs: Users.typeDefs,
    resolvers: {
      Query: {
        ...Users.resolvers.queries,
      },
      Mutation: {
        ...Users.resolvers.mutations,
      },
    },
  });
  await graphqlServer.start();
  return graphqlServer;
};
export default createAppoloGraphqlServer;
