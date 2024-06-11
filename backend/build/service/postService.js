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
const postsModel_1 = __importDefault(require("../database/models/postsModel"));
const categoriesModel_1 = __importDefault(require("../database/models/categoriesModel"));
class PostService {
    constructor() {
        this.createPost = (post) => __awaiter(this, void 0, void 0, function* () {
            const { userId, content, categoryId = 0, title } = post;
            console.log('userId', userId);
            const newPost = yield postsModel_1.default.create({
                userId,
                content,
                categoryId,
                title
            });
            return newPost;
        });
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            const posts = yield postsModel_1.default.findAll();
            return posts;
        });
        this.getPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            const post = yield postsModel_1.default.findByPk(id, {
                include: [{
                        model: categoriesModel_1.default,
                        as: 'category',
                    }]
            });
            return post;
        });
        this.deletePostById = (id) => __awaiter(this, void 0, void 0, function* () {
            const resultPost = yield this.getPostById(id);
            if (resultPost.userId === id) {
                yield postsModel_1.default.destroy({
                    where: { id }
                });
                return 'Post deleted successfully';
            }
            else {
                return 'Post not found or unauthorize';
            }
        });
        this.updatePostById = (id, post) => __awaiter(this, void 0, void 0, function* () {
            const { content, title, userId } = post;
            const resultPost = yield this.getPostById(id);
            if (resultPost.userId === userId) {
                const updatedPost = yield postsModel_1.default.update({
                    content,
                    title
                }, {
                    where: { id },
                    returning: true,
                });
                return updatedPost;
            }
            else {
                return "Post not found or unauthorize";
            }
        });
        this.updatePostLikeById = (id, post) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { likes = 0 } = post;
            const resultPost = yield this.getPostById(id);
            if (resultPost) {
                const newLikes = ((_a = resultPost.likes) !== null && _a !== void 0 ? _a : 0) + likes;
                const updatedPost = yield postsModel_1.default.update({
                    likes: newLikes
                }, {
                    where: { id },
                    returning: true,
                });
                return updatedPost;
            }
            else {
                return "Post not found or unauthorize";
            }
        });
    }
}
exports.default = new PostService();
