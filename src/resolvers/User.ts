import { Context } from '..';

export const User = {
  posts: ({ id }: { id: number }, _: any, { prisma, userId }: Context) => {
    const isOwnProfile = userId === id;

    if (isOwnProfile) {
      return prisma.post.findMany({
        where: { authorId: id },
        orderBy: [{ createdAt: 'desc' }]
      });
    }

    return prisma.post.findMany({
      where: { authorId: id, published: true },
      orderBy: [{ createdAt: 'desc' }]
    });
  }
};
