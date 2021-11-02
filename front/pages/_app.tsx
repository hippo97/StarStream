import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component }) {
  return (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
}
