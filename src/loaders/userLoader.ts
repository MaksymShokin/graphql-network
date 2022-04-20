import { User } from '@prisma/client';
import DataLoader from 'dataloader';
import { prisma } from '..';

type BatchUser = (ids: readonly number[]) => Promise<User[]>;

const batchUsers: BatchUser = async ids => {
  const users = await prisma.user.findMany({
    where: { id: { in: ids as number[] } }
  });

  const sortedUsers: User[] = [];

  ids.forEach(id => {
    const user = users.find(user => user.id === id);

    if (user) {
      sortedUsers.push(user);
    }
  });

  return sortedUsers;
};

export const userLoader = new DataLoader(batchUsers);
