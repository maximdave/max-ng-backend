import express from 'express';
import router from './routes/movieRoutes';
import { pgConnection } from './database/pgConnection';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

pgConnection();

app.use(express.json());
app.use('/', router);
app.listen(3000, () => {
  console.log('Now running on port 3000');
});
