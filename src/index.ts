import { ApolloServer } from 'apollo-server';
import { Query, Mutation, Profile } from './resolvers';
import { typeDefs } from './schema';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from './utils/getUserFromToken';

const prisma = new PrismaClient();

export interface Context {
  prisma: typeof prisma;
  userId: number | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile
  },
  context: ({ req }) => {
    const userId = getUserFromToken(req.headers.authorization)?.userId;

    return {
      prisma,
      userId
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
