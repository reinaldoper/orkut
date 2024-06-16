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
const followerService_1 = __importDefault(require("../service/followerService"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
class FollowerController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.body.id;
                req.body.followerId = userId;
                const follow = yield followerService_1.default.createFollowers(req.body);
                return res.status(statusCodes_1.default.CREATED).json({ message: follow });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(statusCodes_1.default.NOT_FOUND).json({ message: error.message });
                }
                else {
                    return res.status(statusCodes_1.default.ERROR).json({ message: 'An unexpected error occurred' });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id: userId } = req.body.id;
                req.body.userId = Number(id);
                req.body.followerId = userId;
                const unfollow = yield followerService_1.default.deleteFollowers(req.body);
                return res.status(statusCodes_1.default.OK).json({ message: unfollow });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(statusCodes_1.default.NOT_FOUND).json({ message: error.message });
                }
                else {
                    return res.status(statusCodes_1.default.ERROR).json({ message: 'An unexpected error occurred' });
                }
            }
        });
    }
    getFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const followers = yield followerService_1.default.getFollowersById(Number(id));
            return res.status(statusCodes_1.default.OK).json({ message: followers });
        });
    }
    getFollowing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body.id;
            const following = yield followerService_1.default.getFollowingById(Number(id));
            return res.status(statusCodes_1.default.OK).json({ message: following });
        });
    }
}
exports.default = new FollowerController();
