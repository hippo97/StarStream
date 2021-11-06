const express = require("express");

const PORT = 3030;
const path = "/";
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./models/index");

const schema = require("./graphql");
const context = require("./graphql/context/context");

db.sequelize
  .sync()
  .then(() => {
    console.log("sequelize success");
  })
  .catch((err) => {
    console.log("sequelize fail", err);
  });

const corsOptions = {
  origin: "http://localhost:3000",
  Credential: true,
};

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    schema,
    context,
  });
  await server.start();
  server.applyMiddleware({ app, path });

  // The `listen` method launches a web server.
  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
  );
}

startApolloServer();
