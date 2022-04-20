import { Context } from '..';

export const Query = {
  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({ orderBy: [{ createdAt: 'desc' }] });
  },
  me: (_: any, __: any, { prisma, userId }: Context) => {
    if (!userId) {
      return null;
    }

    return prisma.user.findUnique({
      where: {
        id: +userId
      }
    });
  }
};
