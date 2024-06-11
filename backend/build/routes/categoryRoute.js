"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const validateId_1 = __importDefault(require("../middlewares/validateId"));
const validateCategory_1 = __importDefault(require("../middlewares/validateCategory"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', /* auth,  */ categoryController_1.default.findAll);
categoryRouter.post('/', /* auth,  */ validateCategory_1.default, categoryController_1.default.create);
categoryRouter.get('/:id', /* auth,  */ validateId_1.default, categoryController_1.default.findById);
categoryRouter.delete('/:id', /* auth,  */ validateId_1.default, categoryController_1.default.delete);
categoryRouter.put('/:id', /* auth,  */ validateId_1.default, validateCategory_1.default, categoryController_1.default.update);
exports.default = categoryRouter;
