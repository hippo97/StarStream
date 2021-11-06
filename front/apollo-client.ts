import { ApolloClient, createHttpLink, GraphQLRequest } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache, currentUserVar } from "./lib/cache";

function contextSetter(_: GraphQLRequest, { headers }: any) {
  const token = currentUserVar()?.token;
  console.log("token", token);
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
}

const httpLink = createHttpLink({
  uri: "http://localhost:3030",
});

const client = new ApolloClient({
  link: setContext(contextSetter).concat(httpLink),
  cache: cache,
});

export default client;
