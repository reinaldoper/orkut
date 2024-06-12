import auth from "../middlewares/auth";
import validateId from "../middlewares/validateId";
import { Router } from "express";
import followingControllor from "../controllers/followingControllor";

const followingRouter = Router();

followingRouter.post('/', auth, followingControllor.createFollowing);
followingRouter.get('/', auth, followingControllor.getFollowingByUserId);
followingRouter.delete('/', auth, followingControllor.deleteFollowingById);
followingRouter.get('/:id', auth, validateId, followingControllor.getFollowersById);



export default followingRouter;