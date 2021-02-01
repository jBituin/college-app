import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { UserModel } from './User/UserModel';
import { UserResolver } from './resolvers/UserResolver';
import { CollegeResolver } from './resolvers/CollegeResolver';
import { StudentResolver } from './resolvers/StudentResolver';
import { BranchResolver } from './resolvers/BranchResolver';

import { REFRESH_TOKEN_SECRET } from './env.variables';
import { verify } from 'jsonwebtoken';
import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
} from './auth';

(async () => {
  const app = express();
  app.use(json());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
      allowedHeaders: ['Content-Type', 'authorization'],
    })
  );

  app.use(cookieParser());
  app.post('/refresh-token', async (req, res) => {
    const token = req.cookies.refrId;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log('error', error);
      return res.send({ ok: false, accessToken: '' });
    }

    // We have valid token
    // Send new access token
    const user = await UserModel.findById(payload.userId);

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await mongoose.connect(
    'mongodb://localhost:27017/college',
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log(`FATAL: ${err.message}`);
      else console.log('Connected to database');
    }
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        CollegeResolver,
        StudentResolver,
        BranchResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 8888;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})();
