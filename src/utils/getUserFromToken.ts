import jwt from 'jsonwebtoken';

export const getUserFromToken = (token?: string) => {
  if (!token) {
    return;
  }

  try {
    return jwt.verify(token, '23h98h29h23') as { userId: number };
  } catch (error) {
    return null;
  }
};
