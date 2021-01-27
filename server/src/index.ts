import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { UserResolver } from './resolvers/UserResolver';
import { CollegeResolver } from './resolvers/CollegeResolver';
import { StudentResolver } from './resolvers/StudentResolver';

(async () => {
  const app = express();
  app.use(json());

  await mongoose.connect(
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
      resolvers: [UserResolver, CollegeResolver, StudentResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})();
