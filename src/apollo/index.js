import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

const httpLink = new HttpLink({
  // You should use an absolute URL here
  // uri: "http://138.68.3.204:4000/graphql"
  uri: "https://graphql.riverdb.org/graphql"
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Install the vue plugin
Vue.use(VueApollo);

export default apolloClient;
