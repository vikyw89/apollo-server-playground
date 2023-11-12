import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { readFileSync } from 'fs';
import { Resolvers } from './generated/graphql';

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query: {
    books: (_, __, contextValue) => {
      return contextValue.books
    },
  },
  Mutation: {
    addBook: () => {
      return { code: '200', message: 'ok', success: true }
    }
  }
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);