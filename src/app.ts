import express from 'express';
import router from './routes/movieRoutes';
import indexRouter from './routes/indexRoute';
import { pgConnection } from './database/pgConnection';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

pgConnection();

const port = process.env.PORT || 8085
app.use(express.json());
app.use('/', router);
app.use('/', indexRouter);


app.listen(port, () => {
  console.log(`Now running on port ${port}`);
});
