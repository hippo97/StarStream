const express = require("express");

const PORT = 3030;
const path = "/";
const { ApolloServer, gql } = require("apollo-server-express");
const { User } = require("./models/index");

const schema = require("./graphql");

User.sequelize
  .sync()
  .then(() => {
    console.log("sequelize success");
  })
  .catch((err) => {
    console.log("sequelize fail", err);
  });

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app, path });

  // The `listen` method launches a web server.
  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
  );
}

startApolloServer();
