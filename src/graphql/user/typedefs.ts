export const typeDefs = `
  type User {
    id: String!
    firstName: String!
    lastName: String
    email: String!
    token: String
    phoneNumber: String
  }

  type Query {
    hello: String
  }

  type Mutation {
    createUser(firstName: String!, lastName: String, email: String!, password: String!, phoneNumber: String): User
    signIn(email: String!, password: String!): User
  }
`;
