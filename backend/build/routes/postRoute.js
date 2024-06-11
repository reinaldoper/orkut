"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../controllers/postController"));
const validatePost_1 = __importDefault(require("../middlewares/validatePost"));
const validateLikes_1 = __importDefault(require("../middlewares/validateLikes"));
const validateId_1 = __importDefault(require("../middlewares/validateId"));
const validateCreatePost_1 = __importDefault(require("../middlewares/validateCreatePost"));
const postRouter = (0, express_1.Router)();
postRouter.get("/", /* auth,  */ postController_1.default.list);
postRouter.post("/", /* auth,  */ validateCreatePost_1.default, postController_1.default.create);
postRouter.get("/:id", /* auth,  */ validateId_1.default, postController_1.default.getPostById);
postRouter.delete("/:id", /* auth,  */ validateId_1.default, postController_1.default.deletePostById);
postRouter.put("/:id", /* auth,  */ validateId_1.default, validatePost_1.default, postController_1.default.update);
postRouter.patch("/:id", /* auth,  */ validateId_1.default, validateLikes_1.default, postController_1.default.updatePartial);
exports.default = postRouter;
