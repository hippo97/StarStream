const express = require("express");
const app = express();
const PORT = 3030;
const path = "/graphql";
const { ApolloServer, gql } = require("apollo-server-express");
const { User } = require("./models/index");

const resolvers = require("./graphql/resolvers");

User.sequelize
  .sync()
  .then(() => {
    console.log("sequelize success");
  })
  .catch((err) => {
    console.log("sequelize fail", err);
  });

const typeDefs = gql`
  type User {
    id: Int
    firstName: String
    lastName: String
    password: String
  }

  type Query {
    getUserData: [User!]!
    getAllUser(id: Int!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, password: String!): User
    updateUser(
      id: Int!
      firstName: String!
      lastName: String!
      password: String!
    ): User
    deleteUser(
      id: Int!
      firstName: String!
      lastName: String!
      password: String!
    ): User
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path });

// The `listen` method launches a web server.
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
);
