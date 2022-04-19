import { Context } from '../index';

export const checkPostAuth = async (
  userId: number | null,
  postId: string,
  prisma: Context['prisma'],
) => {
  if (!userId) {
    return {
      userErrors: ['User is not authorized'],
      post: null
    };
  }

  const currentPost = await prisma.post.findUnique({
    where: {
      id: +postId
    }
  });

  if (!currentPost) {
    return {
      userErrors: ['Post with such id is not found'],
      post: null
    };
  }

  if (currentPost?.authorId !== userId) {
    return {
      userErrors: ['User is not authorized'],
      post: null
    };
  }
};
