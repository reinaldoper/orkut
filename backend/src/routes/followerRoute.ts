import followersController from "../controllers/followersController";
import auth from "../middlewares/auth";
import validateId from "../middlewares/validateId";
import { Router } from "express";

const followersRouter = Router();


followersRouter.get('/:id', auth, validateId, followersController.getFollowers)
followersRouter.post('/', auth, followersController.create)
followersRouter.get('/', auth, followersController.getFollowing)
followersRouter.delete('/:id', auth, validateId, followersController.delete)


export default followersRouter;