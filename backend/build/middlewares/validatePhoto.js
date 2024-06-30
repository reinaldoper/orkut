"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const statusCodes_1 = __importDefault(require("../statusCodes"));
const validatePhoto = (req, res, next) => {
    const userSchema = zod_1.z.object({
        title: zod_1.z.string().optional(),
        postId: zod_1.z.string().min(1, "postId is required"),
    });
    try {
        userSchema.parse(req.body);
        if (!req.file) {
            return res.status(statusCodes_1.default.BAD_REQUEST).json({ error: "Image is required" });
        }
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(statusCodes_1.default.BAD_REQUEST).json({ error: err.errors[0].message });
        }
        return res.status(statusCodes_1.default.ERROR).json({ error: "Internal server error" });
    }
};
exports.default = validatePhoto;
