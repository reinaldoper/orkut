import photosController from "../controllers/photosController";
import validateId from "../middlewares/validateId";
import auth from "../middlewares/auth";
import validatePhoto from "../middlewares/validatePhoto";
import validatePhotoUpdate from "../middlewares/validatePhotoUpdate";
import { Router } from "express";

const photoRouter = Router();

photoRouter.get('/', auth, photosController.list)
photoRouter.post('/', auth, validatePhoto, photosController.create)
photoRouter.get('/:id', auth, validateId, photosController.getPhotoById)
photoRouter.put('/:id', auth, validateId, validatePhotoUpdate, photosController.updatePhotos)
photoRouter.delete('/:id', auth, validateId, photosController.delete)


export default photoRouter;