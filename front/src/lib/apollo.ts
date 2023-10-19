import { ApolloClient, InMemoryCache } from "@apollo/client";

import { config } from "dotenv";
config();

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});
