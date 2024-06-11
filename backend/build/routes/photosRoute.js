"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const photosController_1 = __importDefault(require("../controllers/photosController"));
const validateId_1 = __importDefault(require("../middlewares/validateId"));
const validatePhoto_1 = __importDefault(require("../middlewares/validatePhoto"));
const validatePhotoUpdate_1 = __importDefault(require("../middlewares/validatePhotoUpdate"));
const express_1 = require("express");
const photoRouter = (0, express_1.Router)();
photoRouter.get('/', /* auth,  */ photosController_1.default.list);
photoRouter.post('/', /* auth,  */ validatePhoto_1.default, photosController_1.default.create);
photoRouter.get('/:id', /* auth,  */ validateId_1.default, photosController_1.default.getPhotoById);
photoRouter.put('/:id', /* auth,  */ validateId_1.default, validatePhotoUpdate_1.default, photosController_1.default.updatePhotos);
photoRouter.delete('/:id', /* auth,  */ validateId_1.default, photosController_1.default.delete);
exports.default = photoRouter;
