import { Post } from '@prisma/client';
import { Context } from '../..';
import { checkPostAuth } from '../../utils/checkPostAuth';

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
        userErrors: ['User is not authorized'],
        post: null
      };
    }

    if (!title || !content) {
      return {
        userErrors: ['Input is invalid'],
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
      postId,
      title,
      content
    }: {
      postId: string;
      title?: string;
      content?: string;
      published?: boolean;
    },
    { prisma, userId }: Context
  ): Promise<PostPayload> => {
    if (!title && !content) {
      return {
        userErrors: ['Input is invalid'],
        post: null
      };
    }

    const errors = await checkPostAuth(userId, postId, prisma);

    if (errors) {
      return errors;
    }

    const post = await prisma.post.update({
      data: {
        title,
        content
      },
      where: {
        id: +postId
      }
    });

    return {
      userErrors: [],
      post
    };
  },
  postDelete: async (
    parent: any,
    { postId }: { postId: string },
    { prisma, userId }: Context
  ): Promise<PostPayload> => {
    const errors = await checkPostAuth(userId, postId, prisma);

    if (errors) {
      return errors;
    }

    const post = await prisma.post.delete({
      where: {
        id: +postId
      }
    });

    return {
      userErrors: [],
      post
    };
  },
  postPublish: async (
    parent: any,
    { postId }: { postId: string },
    { prisma, userId }: Context
  ): Promise<PostPayload> => {
    const errors = await checkPostAuth(userId, postId, prisma);

    if (errors) {
      return errors;
    }

    const post = await prisma.post.update({
      data: {
        published: true
      },
      where: {
        id: +postId
      }
    });

    return {
      userErrors: [],
      post
    };
  },
  postUnpublish: async (
    parent: any,
    { postId }: { postId: string },
    { prisma, userId }: Context
  ): Promise<PostPayload> => {
    const errors = await checkPostAuth(userId, postId, prisma);

    if (errors) {
      return errors;
    }

    const post = await prisma.post.update({
      data: {
        published: false
      },
      where: {
        id: +postId
      }
    });

    return {
      userErrors: [],
      post
    };
  }
};
