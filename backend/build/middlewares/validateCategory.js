"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const statusCodes_1 = __importDefault(require("../statusCodes"));
const validateCategory = (req, res, next) => {
    const userSchema = zod_1.z.object({
        name: zod_1.z.string().min(3, "Name is required"),
    });
    try {
        userSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(statusCodes_1.default.BAD_REQUEST).json({ error: err.errors[0].message });
        }
        return res.status(statusCodes_1.default.ERROR).json({ error: "Internal server error" });
    }
};
exports.default = validateCategory;
