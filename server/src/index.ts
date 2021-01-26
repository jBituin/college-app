import express from 'express';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { UserResolver } from './schema/resolvers/UserResolver';

(async () => {
  const app = express();
  app.use(json());

  mongoose.connect(
    'mongodb://localhost:27017/college',
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('Connected to database');
    }
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 3000;
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})();
