const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./your-graphql-schema'); // Import your GraphQL schema and resolvers
const express = require('express');

const server = new ApolloServer({ typeDefs, resolvers });

// Create an instance of Express
const app = express();

server.applyMiddleware({ app, path: '/graphql' });

// ... The rest of your existing app configuration ...

// Start your Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});