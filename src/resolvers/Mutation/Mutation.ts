import { PostMutation } from './Post';
import { Post, User } from '@prisma/client';
import { Context } from '../..';

interface UserPayload {
  userErrors: string[];
  user: User | null;
}

export const Mutation = {
  ...PostMutation,
  signup: async (
    parent: any,
    {
      email,
      password,
      name,
      bio
    }: { email: string; password: string; name?: string; bio?: string },
    { prisma }: Context
  ): Promise<UserPayload> => {
    const currentUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (currentUser) {
      return {
        userErrors: ['this email is already taken'],
        user: null
      };
    }

    const profile = {
      bio
    };

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        // profile
      }
    });

    return {
      userErrors: [],
      user
    };
  }
};
