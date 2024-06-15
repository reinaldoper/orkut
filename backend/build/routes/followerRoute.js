"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const followersController_1 = __importDefault(require("../controllers/followersController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const validateId_1 = __importDefault(require("../middlewares/validateId"));
const express_1 = require("express");
const followersRouter = (0, express_1.Router)();
followersRouter.get('/:id', auth_1.default, validateId_1.default, followersController_1.default.getFollowers);
followersRouter.post('/', auth_1.default, followersController_1.default.create);
followersRouter.get('/', auth_1.default, followersController_1.default.getFollowing);
followersRouter.delete('/:id', auth_1.default, validateId_1.default, followersController_1.default.delete);
exports.default = followersRouter;
