import { CommentModel } from '../models/CommentModel';
import { MovieModel } from '../models/MovieModel';
import { createConnection } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config();

export const pgConnection = async () => {
    try {
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5431,
        username: 'decagon',
        password: '1234',
        database: 'maxng',
        entities: [CommentModel, MovieModel],
        synchronize: true,
      });
      console.log('Connected to Postgres');
  
      
    } catch (error) {
      console.error(error);
      throw new Error('Unable to connect to Postgres');
    }
  };