import { makeVar, InMemoryCache, gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query {
    user @client
  }
`;

export const currentUserVar = makeVar(null);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user() {
          return currentUserVar();
        },
      },
    },
  },
});
