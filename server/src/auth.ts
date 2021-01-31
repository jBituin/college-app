import { User } from './User/UserSchema';
import { sign } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { MyContext } from './MyContext';
import { Response } from 'express';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './env.variables';

export const createAccessToken = (user: User) => {
  return sign({ userId: user._id }, ACCESS_TOKEN_SECRET!, {
    expiresIn: '1d',
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};

// bearer 19238xjckad
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error('not authenticated');
  }

  return next();
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('refrId', token, {
    httpOnly: true,
    path: '/refresh-token',
  });
};
