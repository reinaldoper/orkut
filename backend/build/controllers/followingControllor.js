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
const followingService_1 = __importDefault(require("../service/followingService"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
class FollowingController {
    createFollowing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userToFollowId } = req.body;
                const { id: userId } = req.body.id;
                yield followingService_1.default.createFollowing(userId, userToFollowId);
                res.status(statusCodes_1.default.CREATED).json({ message: "Followed successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(statusCodes_1.default.NOT_FOUND).json({ error: error.message });
                }
                else {
                    return res.status(statusCodes_1.default.ERROR).json({ error: 'An unexpected error occurred' });
                }
            }
        });
    }
    getFollowingByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.body.id;
            const following = yield followingService_1.default.getFollowingByUserId(userId);
            res.status(statusCodes_1.default.OK).send({ message: following });
        });
    }
    getFollowersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const followers = yield followingService_1.default.getFollowingById(Number(id));
            res.status(statusCodes_1.default.OK).send({ message: followers });
        });
    }
    deleteFollowingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.body.id;
                const following = yield followingService_1.default.deleteFollowing(userId);
                res.status(statusCodes_1.default.OK).send({ message: following });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(statusCodes_1.default.NOT_FOUND).json({ error: error.message });
                }
                else {
                    return res.status(statusCodes_1.default.ERROR).json({ error: 'An unexpected error occurred' });
                }
            }
        });
    }
}
exports.default = new FollowingController();
