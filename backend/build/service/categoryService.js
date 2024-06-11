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
const categoriesModel_1 = __importDefault(require("../database/models/categoriesModel"));
class CategoriesService {
    constructor() {
        this.create = (category) => __awaiter(this, void 0, void 0, function* () {
            const { name } = category;
            const categoryCreate = yield categoriesModel_1.default.create({
                name,
            });
            return categoryCreate;
        });
        this.getAllCategories = () => __awaiter(this, void 0, void 0, function* () {
            const categories = yield categoriesModel_1.default.findAll();
            return categories;
        });
        this.getCategoryById = (id) => __awaiter(this, void 0, void 0, function* () {
            const category = yield categoriesModel_1.default.findByPk(id);
            return category;
        });
        this.updateCategory = (id, category) => __awaiter(this, void 0, void 0, function* () {
            const { name } = category;
            const categoryById = yield this.getCategoryById(id);
            if (!categoryById) {
                return "Cannot find category";
            }
            const categoryUpdate = yield categoriesModel_1.default.update({
                name,
            }, {
                where: {
                    id,
                },
                returning: true,
            });
            return categoryUpdate[1][0];
        });
        this.deleteCategory = (id) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.getCategoryById(id);
            if (!category) {
                return "Cannot find category";
            }
            yield categoriesModel_1.default.destroy({
                where: {
                    id,
                },
            });
            return "Category deleted";
        });
    }
}
exports.default = new CategoriesService();
