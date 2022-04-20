import { Context } from '..';

export const Post = {
  user: ({ authorId }: { authorId: number }, _: any, { prisma }: Context) => {
    if (!authorId) {
      return null;
    }

    return prisma.user.findUnique({ where: { id: authorId } });
  }
};
