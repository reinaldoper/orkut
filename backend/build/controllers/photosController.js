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
const photosService_1 = __importDefault(require("../service/photosService"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
class PhotosController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.body.id;
                const url = req.file;
                const photo = yield photosService_1.default.create(req.body, userId, url);
                return res.status(statusCodes_1.default.CREATED).json({ message: photo });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(statusCodes_1.default.UNAUTHORIZED).json({ error: error.message });
                }
                else {
                    return res.status(statusCodes_1.default.ERROR).json({ error: 'An unexpected error occurred' });
                }
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const photos = yield photosService_1.default.getAll();
            return res.status(statusCodes_1.default.OK).json({ message: photos });
        });
    }
    getPhotoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const photo = yield photosService_1.default.getById(Number(id));
            return res.status(statusCodes_1.default.OK).json({ message: photo });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id: userId } = req.body.id;
                yield photosService_1.default.delete(Number(id), userId);
                return res.status(statusCodes_1.default.OK).json({ message: 'Success with deleted' });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(statusCodes_1.default.UNAUTHORIZED).json({ error: error.message });
                }
                else {
                    return res.status(statusCodes_1.default.ERROR).json({ error: 'An unexpected error occurred' });
                }
            }
        });
    }
    updatePhotos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id: userId } = req.body.id;
                const url = req.file;
                const update = yield photosService_1.default.update(Number(id), req.body, userId, url);
                return res.status(statusCodes_1.default.OK).json({ message: update });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(statusCodes_1.default.UNAUTHORIZED).json({ error: error.message });
                }
                else {
                    return res.status(statusCodes_1.default.ERROR).json({ error: 'An unexpected error occurred' });
                }
            }
        });
    }
}
exports.default = new PhotosController();
