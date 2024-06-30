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
const userService_1 = __importDefault(require("../service/userService"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = req.body;
            const hashPassword = bcryptjs_1.default.hashSync(password, 10);
            req.body.password = hashPassword;
            const image = req.file;
            const user = yield userService_1.default.createUser(req.body, image);
            return res.status(statusCodes_1.default.CREATED).json({ message: user });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield userService_1.default.getUserEmail(email);
            if (!user) {
                return res.status(statusCodes_1.default.BAD_REQUEST).json({ error: "Invalid email" });
            }
            const isPasswordValid = bcryptjs_1.default.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(statusCodes_1.default.BAD_REQUEST).json({ error: "Invalid password" });
            }
            const token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, 'secretKey');
            return res.status(statusCodes_1.default.OK).json({ token: token });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userService_1.default.getAll();
            return res.status(statusCodes_1.default.OK).json({ message: users });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const { id } = req.params; */
            const userId = req.body.id;
            const user = yield userService_1.default.getUserId(Number(userId.id));
            return res.status(statusCodes_1.default.OK).json({ message: user });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { id: userId } = req.body.id;
            if (userId !== Number(id))
                return res.status(statusCodes_1.default.UNAUTHORIZED).json({ error: "User not authorization" });
            const user = yield userService_1.default.deleteUserById(Number(id));
            return res.status(statusCodes_1.default.OK).json({ message: user });
        });
    }
    getUserFollowerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userService_1.default.getUserFollowersById(Number(id));
            if (user)
                return res.status(statusCodes_1.default.OK).json({ message: user });
            else
                return res.status(statusCodes_1.default.NOT_FOUND).json({ error: "User not found" });
        });
    }
    getUserFollowingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userService_1.default.getUserFollowingsById(Number(id));
            if (user)
                return res.status(statusCodes_1.default.OK).json({ message: user });
            else
                return res.status(statusCodes_1.default.NOT_FOUND).json({ error: "User not found" });
        });
    }
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const user = yield userService_1.default.getUserEmail(email);
            if (user)
                return res.status(statusCodes_1.default.OK).json({ message: user });
            else
                return res.status(statusCodes_1.default.NOT_FOUND).json({ error: "User not found" });
        });
    }
}
exports.default = new UserController();
