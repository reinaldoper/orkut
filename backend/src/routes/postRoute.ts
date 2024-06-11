import { Router } from "express";
import postController from "../controllers/postController";
import auth from "../middlewares/auth";
import validatePost from "../middlewares/validatePost"
import validateLikes from "../middlewares/validateLikes";
import validateId from "../middlewares/validateId";
import validateCreatePost from "../middlewares/validateCreatePost";

const postRouter = Router();

postRouter.get("/", auth, postController.list);
postRouter.post("/", auth, validateCreatePost, postController.create);
postRouter.get("/:id", auth, validateId, postController.getPostById);
postRouter.delete("/:id", auth, validateId, postController.deletePostById);
postRouter.put("/:id", auth, validateId, validatePost, postController.update);
postRouter.patch("/:id", auth, validateId, validateLikes, postController.updatePartial);


export default postRouter;