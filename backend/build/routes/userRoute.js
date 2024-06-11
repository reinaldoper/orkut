"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const express_1 = require("express");
const validateUser_1 = __importDefault(require("../middlewares/validateUser"));
const validateLogin_1 = __importDefault(require("../middlewares/validateLogin"));
const validateId_1 = __importDefault(require("../middlewares/validateId"));
const routerUser = (0, express_1.Router)();
routerUser.get('/', /* auth,  */ userController_1.default.list);
routerUser.post('/', validateUser_1.default, userController_1.default.create);
routerUser.get('/:id', /* auth,  */ validateId_1.default, userController_1.default.findById);
routerUser.delete('/:id', /* auth,  */ validateId_1.default, userController_1.default.delete);
routerUser.get('/follow/:id', /* auth,  */ validateId_1.default, userController_1.default.getUserFollowerById);
routerUser.get('/following/:id', /* auth,  */ validateId_1.default, userController_1.default.getUserFollowingById);
routerUser.post('/login', validateLogin_1.default, userController_1.default.login);
exports.default = routerUser;
