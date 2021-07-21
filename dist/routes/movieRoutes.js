"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createComment_1 = require("../controllers/createComment");
const getMovies_1 = require("../controllers/getMovies");
const getMovieCharacters_1 = require("../controllers/getMovieCharacters");
const router = express_1.default.Router();
router.post('/maxng/comment/:id', createComment_1.commentOnMovie);
router.get('/maxng/movie', getMovies_1.movieList);
router.get('/maxng/query', getMovies_1.getAllFilmQueried);
router.get('/maxng/query1/:id', getMovies_1.getOneFilmQueried);
router.get('/maxng/movie/:id', getMovies_1.getOneMovie);
router.get('/maxng/character/:id', getMovieCharacters_1.getMovieCharacter);
exports.default = router;
//# sourceMappingURL=movieRoutes.js.map