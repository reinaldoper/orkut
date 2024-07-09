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
const fs_1 = __importDefault(require("fs"));
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
    create(photo, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title = '', postId } = photo;
            const post = yield postsModel_1.default.findByPk(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            return yield photosModel_1.default.create({
                url: `/uploads/${url === null || url === void 0 ? void 0 : url.filename}`,
                title,
                postId
            });
        });
    }
    update(id, updatedPhoto, userId, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title = '' } = updatedPhoto;
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
            fs_1.default.unlinkSync(photo.url);
            return yield photo.update({
                url: url ? url.path : '',
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
            fs_1.default.unlinkSync(photo.url);
            return yield photo.destroy();
        });
    }
}
exports.default = new PhotosService();
