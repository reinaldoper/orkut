import { Router } from "express";
import categoryController from "../controllers/categoryController";
import auth from "../middlewares/auth";
import validateId from "../middlewares/validateId";
import validateCategory from "../middlewares/validateCategory";

const categoryRouter = Router();

categoryRouter.get('/', auth, categoryController.findAll);
categoryRouter.post('/', auth, validateCategory, categoryController.create);
categoryRouter.get('/:id', auth, validateId, categoryController.findById);
categoryRouter.delete('/:id', auth, validateId, categoryController.delete);
categoryRouter.put('/:id', auth, validateId, validateCategory, categoryController.update);


export default categoryRouter;