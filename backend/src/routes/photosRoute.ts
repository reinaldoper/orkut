import photosController from "../controllers/photosController";
import validateId from "../middlewares/validateId";
import auth from "../middlewares/auth";
import validatePhoto from "../middlewares/validatePhoto";
import validatePhotoUpdate from "../middlewares/validatePhotoUpdate";
import { Router } from "express";
import storage from '../conf/storageSingle'
import multer from "multer";

const photoRouter = Router();
const upload = multer({ storage: storage });

photoRouter.get('/', auth, photosController.list)
photoRouter.post('/', auth, upload.single('url'), validatePhoto, photosController.create)
photoRouter.get('/:id', auth, validateId, photosController.getPhotoById)
photoRouter.put('/:id', auth, validateId, validatePhotoUpdate, photosController.updatePhotos)
photoRouter.delete('/:id', auth, validateId, photosController.delete)


export default photoRouter;