import { Post } from '@prisma/client';
import { Context } from '../..';

interface PostPayload {
  userErrors: string[];
  post: Post | null;
}

export const PostMutation = {
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
  },
  postUpdate: async (
    parent: any,
    {
      id,
      title,
      content
    }: { id: string; title?: string; content?: string; published?: boolean },
    { prisma }: Context
  ): Promise<PostPayload> => {
    if (!title && !content) {
      return {
        userErrors: ['invalid input'],
        post: null
      };
    }

    const currentPost = await prisma.post.findUnique({
      where: {
        id: +id
      }
    });

    if (!currentPost) {
      return {
        userErrors: ['updating post not found'],
        post: null
      };
    }

    const post = await prisma.post.update({
      data: {
        title,
        content
      },
      where: {
        id: +id
      }
    });

    return {
      userErrors: [],
      post
    };
  },
  postDelete: async (
    parent: any,
    { id }: { id: string },
    { prisma }: Context
  ): Promise<PostPayload> => {
    const currentPost = await prisma.post.findUnique({
      where: {
        id: +id
      }
    });

    if (!currentPost) {
      return {
        userErrors: ['deleting post not found'],
        post: null
      };
    }

    const post = await prisma.post.delete({
      where: {
        id: +id
      }
    });

    return {
      userErrors: [],
      post
    };
  }
};
