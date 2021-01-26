import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
