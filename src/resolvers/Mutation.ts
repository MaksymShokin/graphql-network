import { Post } from '@prisma/client';
import { Context } from '../index';

interface PostPayload {
  userErrors: string[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    parent: any,
    { title, content }: { title: string; content: string },
    { prisma }: Context
  ): Promise<PostPayload> => {
    if (!title || !content) {
      return {
        userErrors: ['invalid input'],
        post: null
      };
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1
      }
    });

    return {
      userErrors: [],
      post
    };
  }
};
