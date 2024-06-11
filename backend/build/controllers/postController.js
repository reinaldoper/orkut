"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postService_1 = __importDefault(require("../service/postService"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
class PostController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.body.id;
            req.body.userId = userId;
            const post = yield postService_1.default.createPost(req.body);
            return res.status(statusCodes_1.default.CREATED).json({ message: post });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield postService_1.default.getAllPosts();
            return res.status(statusCodes_1.default.OK).json({ message: posts });
        });
    }
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield postService_1.default.getPostById(Number(id));
            if (post)
                return res.status(statusCodes_1.default.OK).json({ message: post });
            else
                return res.status(statusCodes_1.default.NOT_FOUND).json({ message: "Post not found" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { content, title } = req.body;
            const { id: userId } = req.body.id;
            const post = yield postService_1.default.updatePostById(Number(id), { content, title, userId });
            return res.status(statusCodes_1.default.OK).json({ message: post });
        });
    }
    updatePartial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { likes } = req.body;
            const post = yield postService_1.default.updatePostLikeById(Number(id), { likes });
            return res.status(statusCodes_1.default.OK).json({ message: post });
        });
    }
    deletePostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield postService_1.default.deletePostById(Number(id));
            return res.status(statusCodes_1.default.OK).json({ message: post });
        });
    }
}
exports.default = new PostController();
