import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
// import { WarRes } from 'src/interface/interface';
import { MovieModel } from '../entity/MovieModel';
import { createQueryBuilder } from 'typeorm';

export const movieList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const movieResult = await MovieModel.find();
    if (!movieResult.length) {
      const movie = await axios.get('https://swapi.dev/api/films/');
      if (movie) {
        const movies = movie.data.results;
        const movieList = movies.map(async (item: any) => {
          const newMovie = MovieModel.create({
            title: item.title,
            episode_id: item.episode_id,
            opening_crawl: item.opening_crawl,
            director: item.director,
            producer: item.producer,
            release_date: item.release_date,
            characters: item.characters,
            created: item.created,
            edited: item.edited,
            url: item.url,
          });
          const movieData = await MovieModel.save(newMovie);
        });
        const result = await Promise.all(movieList);
        return res.status(200).json({ results: movie });
      }
    }
    return res.status(200).json({ results: movieResult });
  } catch (error) {
    console.log('error form get movies: ', error.message);
    return res
      .status(400)
      .json({ message: 'Error Saving and retrieving Data' });
  }
};

export const getOneMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findOne(id);

    if (movie) {
      return res.status(200).json({ result: movie });
    } else {
      return res.status(401).json({ msg: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
};


export const getAllFilmQueried = async (req: Request, res: Response): Promise<Response | void> => {
  try {
      const movie = await createQueryBuilder(
          'movie'
      )
      .select('movie.opening_crawl')
      .addSelect('movie.title')
      .addSelect('movie.release_date')
      .from(MovieModel,'movie')
      // .orderBy('movie.release_date', 'ASC');
      .getMany()
      return res.status(201).json({movie})
  } catch (error) {
      console.error(error)
      throw new Error('Something went wrong')
  }
}


export const getOneFilmQueried = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const {id} = req.params
      const movie = await createQueryBuilder(
          'movie'
      )
      .select('movie.opening_crawl')
      .addSelect('movie.title')
      .addSelect('movie.release_date')
      .from(MovieModel,'movie')
      .where("movie.id = :id", { id: parseInt(id)})
      // .orderBy('movie.release_date', 'ASC');
      .getOne()
      return res.status(201).json({movie})
  } catch (error) {
      console.error(error)
      throw new Error('Something went wrong')
  }
}