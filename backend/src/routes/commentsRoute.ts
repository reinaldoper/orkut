import { Router } from "express";
import commentsController from "../controllers/commentsController";
import auth from "../middlewares/auth";
import validateId from "../middlewares/validateId";
import validateComment from "../middlewares/validateComment";
import validatePost from "../middlewares//validateCreateComment";

const commentsRouter = Router();

commentsRouter.get("/", auth, commentsController.getAllComments);
commentsRouter.get("/:id", auth, validateId, commentsController.getCommentsByPostId);
commentsRouter.post("/", auth, validatePost, commentsController.createComment);
commentsRouter.put("/:id", auth, validateId, validateComment, commentsController.updateComment);
commentsRouter.delete("/:id", auth, validateId, commentsController.deleteComment);

export default commentsRouter;