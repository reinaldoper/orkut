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
const statusCodes_1 = __importDefault(require("../statusCodes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = __importDefault(require("../service/userService"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(statusCodes_1.default.UNAUTHORIZED).json({ message: "Authorization is required" });
        }
        const decoded = jsonwebtoken_1.default.verify(authHeader, 'secretKey');
        const user = yield userService_1.default.getUserEmail(decoded.email);
        if (!user) {
            return res.status(statusCodes_1.default.NOT_FOUND).json({ message: "User not found" });
        }
        req.body.id = decoded;
        next();
    }
    catch (error) {
        return res.status(statusCodes_1.default.UNAUTHORIZED).json({ message: "Invalid token" });
    }
});
exports.default = auth;
