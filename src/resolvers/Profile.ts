import { Context } from '..';

export const Profile = {
  user: ({ userId }: { userId: number }, _: any, { prisma }: Context) => {
    if (!userId) {
      return null;
    }

    return prisma.user.findUnique({ where: { id: userId } });
  }
};
