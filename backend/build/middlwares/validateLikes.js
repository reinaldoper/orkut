"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const statusCodes_1 = __importDefault(require("../statusCodes"));
const validateLikes = (req, res, next) => {
    const userSchema = zod_1.z.object({
        num: zod_1.z.number().min(1, "Likes must be greater than 1"),
    });
    try {
        const { likes } = req.body;
        const num = Number(likes);
        userSchema.parse({ num });
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: err.errors[0].message });
        }
        return res.status(statusCodes_1.default.ERROR).json({ message: "Internal server error" });
    }
};
exports.default = validateLikes;
