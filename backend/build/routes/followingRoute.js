"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../middlewares/auth"));
const validateId_1 = __importDefault(require("../middlewares/validateId"));
const express_1 = require("express");
const followingControllor_1 = __importDefault(require("../controllers/followingControllor"));
const followingRouter = (0, express_1.Router)();
followingRouter.post('/', auth_1.default, followingControllor_1.default.createFollowing);
followingRouter.get('/', auth_1.default, followingControllor_1.default.getFollowingByUserId);
followingRouter.delete('/', auth_1.default, followingControllor_1.default.deleteFollowingById);
followingRouter.get('/:id', auth_1.default, validateId_1.default, followingControllor_1.default.getFollowersById);
exports.default = followingRouter;
