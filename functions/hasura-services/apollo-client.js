const functions = require('firebase-functions');
const ApolloClient = require("apollo-boost").ApolloClient;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
const fetch = require("cross-fetch/polyfill").fetch;
const createHttpLink = require("apollo-link-http").createHttpLink;

const client = new ApolloClient({
    // cache: new InMemoryCache(),
    link: createHttpLink({
        uri: "https://recaps.hasura.app/v1/graphql",
        headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "K1uBwp5MN0Ar8tXfOwTF0VEWZMvu2e2OkEmBss4L69OxTT80BG7ngiIV944y7kHG"
                //functions.config().hasura.admin_secret
                // "yjsR6rUOSNTH5DiNDwWYpHE0ZsDAcRGKud0FXYVSc84BTFyHjhoM7X7V0YyLoql3",
        },
        fetch: fetch,
    }),
    cache: new InMemoryCache(),
});

module.exports = client;
