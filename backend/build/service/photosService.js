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
const photosModel_1 = __importDefault(require("../database/models/photosModel"));
const postsModel_1 = __importDefault(require("../database/models/postsModel"));
class PhotosService {
    constructor() {
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield photosModel_1.default.findAll({
                include: [
                    {
                        model: postsModel_1.default,
                        as: 'post',
                    }
                ]
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield photosModel_1.default.findByPk(id, {
                include: [
                    {
                        model: postsModel_1.default,
                        as: 'post',
                    }
                ]
            });
        });
    }
    create(photo, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, title = '', postId } = photo;
            const post = yield postsModel_1.default.findByPk(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            if (post.userId !== userId) {
                throw new Error('Unauthorized');
            }
            return yield photosModel_1.default.create({
                url,
                title,
                postId
            });
        });
    }
    update(id, updatedPhoto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, title = '' } = updatedPhoto;
            const photo = yield photosModel_1.default.findByPk(id, {
                include: [
                    {
                        model: postsModel_1.default,
                        as: 'post',
                    }
                ]
            });
            if (!photo) {
                throw new Error('Photo not found');
            }
            if (photo.post.userId !== userId) {
                throw new Error('Unauthorized');
            }
            return yield photo.update({
                url,
                title
            });
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const photo = yield photosModel_1.default.findByPk(id, {
                include: [
                    {
                        model: postsModel_1.default,
                        as: 'post',
                    }
                ]
            });
            if (!photo) {
                throw new Error('Photo not found');
            }
            if (photo.post.userId !== userId) {
                throw new Error('Unauthorized');
            }
            return yield photo.destroy();
        });
    }
}
exports.default = new PhotosService();
