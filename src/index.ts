import { ApolloServer } from 'apollo-server';
import { Query, Mutation } from './resolvers';
import { typeDefs } from './schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: typeof prisma;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  context: {
    prisma
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
