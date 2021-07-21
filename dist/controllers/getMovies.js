"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneFilmQueried = exports.getAllFilmQueried = exports.getOneMovie = exports.movieList = void 0;
const axios_1 = __importDefault(require("axios"));
const MovieModel_1 = require("../entity/MovieModel");
const typeorm_1 = require("typeorm");
const movieList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieResult = yield MovieModel_1.MovieModel.find();
        if (!movieResult.length) {
            const movie = yield axios_1.default.get('https://swapi.dev/api/films/');
            if (movie) {
                const movies = movie.data.results;
                const movieList = movies.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                    const newMovie = MovieModel_1.MovieModel.create({
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
                    const movieData = yield MovieModel_1.MovieModel.save(newMovie);
                }));
                const result = yield Promise.all(movieList);
                return res.status(200).json({ results: movie });
            }
        }
        return res.status(200).json({ results: movieResult });
    }
    catch (error) {
        console.log('error form get movies: ', error.message);
        return res
            .status(400)
            .json({ message: 'Error Saving and retrieving Data' });
    }
});
exports.movieList = movieList;
const getOneMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movie = yield MovieModel_1.MovieModel.findOne(id);
        if (movie) {
            return res.status(200).json({ result: movie });
        }
        else {
            return res.status(401).json({ msg: 'Not found' });
        }
    }
    catch (error) {
        console.error(error);
        throw new Error('Something went wrong');
    }
});
exports.getOneMovie = getOneMovie;
const getAllFilmQueried = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield typeorm_1.createQueryBuilder('movie')
            .select('movie.opening_crawl')
            .addSelect('movie.title')
            .addSelect('movie.release_date')
            .from(MovieModel_1.MovieModel, 'movie')
            .getMany();
        return res.status(201).json({ movie });
    }
    catch (error) {
        console.error(error);
        throw new Error('Something went wrong');
    }
});
exports.getAllFilmQueried = getAllFilmQueried;
const getOneFilmQueried = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movie = yield typeorm_1.createQueryBuilder('movie')
            .select('movie.opening_crawl')
            .addSelect('movie.title')
            .addSelect('movie.release_date')
            .from(MovieModel_1.MovieModel, 'movie')
            .where("movie.id = :id", { id: parseInt(id) })
            .getOne();
        return res.status(201).json({ movie });
    }
    catch (error) {
        console.error(error);
        throw new Error('Something went wrong');
    }
});
exports.getOneFilmQueried = getOneFilmQueried;
//# sourceMappingURL=getMovies.js.map