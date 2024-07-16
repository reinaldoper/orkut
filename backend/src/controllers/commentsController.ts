import commentsService from "../service/commentsService";
import statusCodes from "../statusCodes";
import { Request, Response } from "express";
import { io } from '../server'

class CommentsController {

  constructor() { }

  createComment = async (req: Request, res: Response) => {
    try {
      const comment = await commentsService.createComment(req.body);
      io.emit('newComment', comment);
      return res.status(statusCodes.CREATED).json({ message: comment });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.NOT_FOUND).json({ error: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ error: 'An unexpected error occurred' });
      }
    }

  }

  getCommentsByPostId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comments = await commentsService.getCommentsById(Number(id));
    return res.status(statusCodes.OK).json({ message: comments });
  }

  getAllComments = async (req: Request, res: Response) => {
    const comments = await commentsService.getComments();
    return res.status(statusCodes.OK).json({ message: comments });
  }

  updateComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await commentsService.updateComment(Number(id), req.body);
      return res.status(statusCodes.OK).json({ message: comment });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.NOT_FOUND).json({ error: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ error: 'An unexpected error occurred' });
      }
    }

  }

  deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comment = await commentsService.deleteComment(Number(id));
    return res.status(statusCodes.OK).json({ message: comment });
  }

}

export default new CommentsController();