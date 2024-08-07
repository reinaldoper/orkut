import userController from "../controllers/userController";
import { Router } from "express";
import auth from "../middlewares/auth";
import validateUser from "../middlewares/validateUser";
import validateLogin from "../middlewares/validateLogin";
import validateId from "../middlewares/validateId"
import multer from "multer";
import storage from "../conf/storageSingle";

const routerUser = Router();
const upload = multer({ storage: storage });

routerUser.get('/', auth, userController.list);
routerUser.post('/', upload.single('image'), validateUser, userController.create);
routerUser.get('/find', auth, userController.findById);
routerUser.delete('/:id', auth, validateId, userController.delete);
routerUser.get('/follow/:id', auth, validateId, userController.getUserFollowerById);
routerUser.get('/following/:id', auth, validateId, userController.getUserFollowingById);
routerUser.post('/login', validateLogin, userController.login);
routerUser.get('/:email', auth, userController.getUserByEmail);
routerUser.get('/find/:id', auth, validateId, userController.getUserById);

export default routerUser;