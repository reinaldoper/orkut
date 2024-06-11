import userController from "../controllers/userController";
import { Router } from "express";
import auth from "../middlewares/auth";
import validateUser from "../middlewares/validateUser";
import validateLogin from "../middlewares/validateLogin";
import validateId from "../middlewares/validateId"

const routerUser = Router();


routerUser.get('/', auth, userController.list);
routerUser.post('/', validateUser, userController.create);
routerUser.get('/:id', auth, validateId, userController.findById);
routerUser.delete('/:id', auth, validateId, userController.delete);
routerUser.get('/follow/:id', auth, validateId, userController.getUserFollowerById);
routerUser.get('/following/:id', auth, validateId, userController.getUserFollowingById);
routerUser.post('/login', validateLogin, userController.login)

export default routerUser;