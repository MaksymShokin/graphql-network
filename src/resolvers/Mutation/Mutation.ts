import { PostMutation } from './Post';
import { Post, User } from '@prisma/client';
import { Context } from '../..';
import validator from 'validator';

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
    if (!validator.isEmail(email)) {
      return {
        userErrors: ['email is not valid'],
        user: null
      };
    }

    if (
      !validator.isLength(password, {
        min: 4
      })
    ) {
      return {
        userErrors: ['password is too short'],
        user: null
      };
    }

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

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name
        // profile
      }
    });

    return {
      userErrors: [],
      user
    };
  }
};
