const express = require("express");
const app = express();
const PORT = 3030;
const path = "/graphql";
const { ApolloServer, gql } = require("apollo-server-express");
const { User } = require("./models/index");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

User.sequelize
  .sync()
  .then(() => {
    console.log("sequelize success");
  })
  .catch((err) => {
    console.log("sequelize fail", err);
  });

const server = new ApolloServer({ typeDefs, resolvers });
//server.applyMiddleware({ app, path });

// The `listen` method launches a web server.
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
);
