import { NextFunction, Request, Response } from "express";
import { CommentModel } from "../models/CommentModel";
import { MovieModel } from "../models/MovieModel";

export const commentOnMovie = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { movieId } = req.params;
    const { comment } = req.body;
    const movie = await MovieModel.findOne(movieId);
    if (!movie) {
      return res.status(400).json({
        msg: "Film not found",
      });
    }
    const newComment = CommentModel.create({
      comment,
      movie
    });
    await newComment.save();
    return res.status(201).json({
      msg: "comment added",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};