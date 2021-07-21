import { CommentModel } from '../entity/CommentModel';
import { MovieModel } from '../entity/MovieModel';
import { createConnection } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config();

export const pgConnection = async () => {
  try {
    await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [CommentModel, MovieModel],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      }
    });
    console.log('Connected to Postgres');
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to Postgres');
  }
};
