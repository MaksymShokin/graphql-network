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
    { prisma, userId }: Context
  ): Promise<PostPayload> => {
    if (!userId) {
      return {
        userErrors: ['not authorized'],
        post: null
      };
    }

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
        authorId: userId
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
    { prisma, userId }: Context
  ): Promise<PostPayload> => {
    if (!title && !content) {
      return {
        userErrors: ['invalid input'],
        post: null
      };
    }

    if (!userId) {
      return {
        userErrors: ['not authorized'],
        post: null
      };
    }

    const currentPost = await prisma.post.findUnique({
      where: {
        id: +id
      }
    });

    if (currentPost?.authorId !== userId) {
      return {
        userErrors: ['not authorized'],
        post: null
      };
    }

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
    { prisma, userId }: Context
  ): Promise<PostPayload> => {
    if (!userId) {
      return {
        userErrors: ['not authorized'],
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
        userErrors: ['deleting post not found'],
        post: null
      };
    }

    if (currentPost?.authorId !== userId) {
      return {
        userErrors: ['not authorized'],
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
