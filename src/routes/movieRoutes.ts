import express from 'express';
import { commentOnMovie } from '../controllers/createComment';
import { getOneMovie, movieList, getAllFilmQueried, getOneFilmQueried } from '../controllers/getMovies';
import { getMovieCharacter } from '../controllers/getMovieCharacters';
const router = express.Router();


router.post('/maxng/comment/:id', commentOnMovie);
router.get('/maxng/movie', movieList);
router.get('/maxng/query', getAllFilmQueried);
router.get('/maxng/query1/:id', getOneFilmQueried);
router.get('/maxng/movie/:id', getOneMovie);
router.get('/maxng/character/:id', getMovieCharacter);

export default router;
