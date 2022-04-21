import { Context } from '..';

export const Query = {
  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      where: { published: true },
      orderBy: [{ createdAt: 'desc' }]
    });
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
  },
  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma, userId: userIdFromToken }: Context
  ) => {
    if (!userId) {
      return null;
    }

    const isUserProfile = userIdFromToken === +userId;
    const profile = await prisma.profile.findUnique({
      where: { userId: +userId }
    });

    return {
      ...profile,
      isMyProfile: isUserProfile
    };
  }
};
