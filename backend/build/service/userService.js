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
const usersModel_1 = __importDefault(require("../database/models/usersModel"));
const postsModel_1 = __importDefault(require("../database/models/postsModel"));
const photosModel_1 = __importDefault(require("../database/models/photosModel"));
const followersModel_1 = __importDefault(require("../database/models/followersModel"));
const followingModel_1 = __importDefault(require("../database/models/followingModel"));
const categoriesModel_1 = __importDefault(require("../database/models/categoriesModel"));
class UserService {
    constructor() {
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, image, relationship, interesting, city, work, age, education } = user;
            try {
                const newUser = yield usersModel_1.default.create({
                    name,
                    email,
                    password,
                    image,
                    relationship,
                    interesting,
                    city,
                    work,
                    age,
                    education
                });
                return newUser;
            }
            catch (error) {
                if (error instanceof Error) {
                    return `Error: ${error.message}`;
                }
                else {
                    return 'An unexpected error occurred';
                }
            }
        });
        this.deleteUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield usersModel_1.default.findByPk(id);
                if (!user) {
                    throw new Error('User not found');
                }
                yield usersModel_1.default.destroy({ where: { id } });
                return 'User deleted successfully';
            }
            catch (error) {
                if (error instanceof Error) {
                    return `Error: ${error.message}`;
                }
                return 'An unknown error occurred';
            }
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const users = yield usersModel_1.default.findAll({
                attributes: { exclude: ['password'] },
                include: [{
                        model: postsModel_1.default,
                        as: 'posts',
                        include: [
                            {
                                model: photosModel_1.default,
                                as: 'photos'
                            }
                        ]
                    }]
            });
            return users;
        });
        this.getUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield usersModel_1.default.findByPk(id, {
                attributes: { exclude: ['password'] },
                include: [{
                        model: postsModel_1.default,
                        as: 'posts',
                        include: [
                            {
                                model: photosModel_1.default,
                                as: 'photos',
                            },
                            {
                                model: categoriesModel_1.default,
                                as: 'category',
                            }
                        ]
                    }]
            });
            return user;
        });
        this.getUserEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield usersModel_1.default.findOne({
                where: { email },
            });
            return user;
        });
        this.getUserFollowersById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield usersModel_1.default.findByPk(id, {
                attributes: { exclude: ['password'] },
                include: [{
                        model: followersModel_1.default,
                        as: 'followers',
                    }]
            });
            return user;
        });
        this.getUserFollowingsById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield usersModel_1.default.findByPk(id, {
                attributes: { exclude: ['password'] },
                include: [{
                        model: followingModel_1.default,
                        as: 'followingUser',
                    }]
            });
            return user;
        });
    }
}
exports.default = new UserService();
