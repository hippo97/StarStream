import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    email: String!
    password: String!
  }

  type Query {
    getUserData: [User!]!
    getAllUser(id: String!): User
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    updateUser(email: String!, password: String!): User!
    deleteUser(email: String!): User
  }
`;

module.exports = typeDefs;
