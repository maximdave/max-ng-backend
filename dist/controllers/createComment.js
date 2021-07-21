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
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnMovie = void 0;
const CommentModel_1 = require("../entity/CommentModel");
const MovieModel_1 = require("../entity/MovieModel");
const commentOnMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { comment } = req.body;
        const movie = yield MovieModel_1.MovieModel.findOne(movieId);
        if (!movie) {
            return res.status(400).json({
                msg: "Film not found",
            });
        }
        const newComment = CommentModel_1.CommentModel.create({
            comment,
            movie
        });
        yield newComment.save();
        return res.status(201).json({
            msg: "comment added",
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
});
exports.commentOnMovie = commentOnMovie;
//# sourceMappingURL=createComment.js.map