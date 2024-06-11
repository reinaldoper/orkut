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
const categoryService_1 = __importDefault(require("../service/categoryService"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
class CategoryController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryService_1.default.create(req.body);
            return res.status(statusCodes_1.default.CREATED).json({ message: category });
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield categoryService_1.default.getAllCategories();
            return res.status(statusCodes_1.default.OK).json({ message: categories });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const category = yield categoryService_1.default.getCategoryById(Number(id));
            return res.status(statusCodes_1.default.OK).json({ message: category });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const category = yield categoryService_1.default.deleteCategory(Number(id));
            return res.status(statusCodes_1.default.OK).json({ message: category });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const category = yield categoryService_1.default.updateCategory(Number(id), req.body);
            return res.status(statusCodes_1.default.OK).json({ message: category });
        });
    }
}
exports.default = new CategoryController();
