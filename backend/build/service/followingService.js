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
const followingModel_1 = __importDefault(require("../database/models/followingModel"));
const usersModel_1 = __importDefault(require("../database/models/usersModel"));
class FollowingService {
    constructor() { }
    createFollowing(userId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersModel_1.default.findByPk(userId);
            const following = yield usersModel_1.default.findByPk(followingId);
            if (!user || !following) {
                throw new Error('User not found');
            }
            const create = yield followingModel_1.default.create({
                userId,
                followingId
            });
            return create;
        });
    }
    getFollowingByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const following = yield followingModel_1.default.findAll({
                where: {
                    userId
                }
            });
            return following;
        });
    }
    getFollowingById(followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const following = yield followingModel_1.default.findAll({
                where: {
                    followingId
                }
            });
            return following;
        });
    }
    deleteFollowing(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersModel_1.default.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            yield followingModel_1.default.destroy({
                where: {
                    userId,
                }
            });
            return 'Following deleted';
        });
    }
}
exports.default = new FollowingService();
