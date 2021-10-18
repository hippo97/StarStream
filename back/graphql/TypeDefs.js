import { gql } from "apollo-server-express";

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

module.exports = typeDefs;
