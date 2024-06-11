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
const followersModel_1 = __importDefault(require("../database/models/followersModel"));
const usersModel_1 = __importDefault(require("../database/models/usersModel"));
class FollowerService {
    constructor() { }
    createFollowers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, followerId } = data;
            const user = yield usersModel_1.default.findByPk(userId);
            const follower = yield usersModel_1.default.findByPk(followerId);
            if (!user || !follower) {
                throw new Error('User not found');
            }
            const create = yield followersModel_1.default.create({
                userId,
                followerId
            });
            return create;
        });
    }
    getFollowersById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const followers = yield followersModel_1.default.findAll({
                where: {
                    userId
                },
                include: [
                    {
                        model: usersModel_1.default,
                        as: 'follower',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });
            return followers;
        });
    }
    getFollowingById(followerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const following = yield followersModel_1.default.findAll({
                where: {
                    followerId,
                },
                include: [
                    {
                        model: usersModel_1.default,
                        as: 'user',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });
            return following;
        });
    }
    deleteFollowers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, followerId } = data;
            const user = yield usersModel_1.default.findByPk(userId);
            const follower = yield usersModel_1.default.findByPk(followerId);
            if (!user || !follower) {
                throw new Error('User not found');
            }
            return yield followersModel_1.default.destroy({
                where: {
                    userId,
                    followerId
                }
            });
        });
    }
}
exports.default = new FollowerService();
