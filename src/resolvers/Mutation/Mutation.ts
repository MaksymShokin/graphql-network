import { PostMutation } from './Post';
import { Context } from '../..';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserPayload {
  userErrors: string[];
  token: string | null;
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
    }: { email: string; password: string; name: string; bio: string },
    { prisma }: Context
  ): Promise<UserPayload> => {
    if (!validator.isEmail(email)) {
      return {
        userErrors: ['email is not valid'],
        token: null
      };
    }

    if (
      !validator.isLength(password, {
        min: 4
      })
    ) {
      return {
        userErrors: ['password is too short'],
        token: null
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
        token: null
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    await prisma.profile.create({ data: { bio, userId: user.id } });

    const token = jwt.sign(
      {
        userId: user.id
      },
      '23h98h29h23',
      { expiresIn: 360000 }
    );

    return {
      userErrors: [],
      token
    };
  },
  signin: async (
    parent: any,
    { email, password }: { email: string; password: string },
    { prisma }: Context
  ): Promise<UserPayload> => {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return {
        userErrors: ['user with such email does not exist'],
        token: null
      };
    }

    const hashedPassword = await bcrypt.compare(password, user?.password);

    if (!hashedPassword) {
      return {
        userErrors: ['password is not correct'],
        token: null
      };
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      '23h98h29h23',
      { expiresIn: 360000 }
    );

    return {
      userErrors: [],
      token
    };
  }
};
