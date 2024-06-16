"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const statusCodes_1 = __importDefault(require("../statusCodes"));
const validateUser = (req, res, next) => {
    const userSchema = zod_1.z.object({
        name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
        email: zod_1.z.string().email("Invalid email"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        image: zod_1.z.string().min(1, "Image must be at least 1 character"),
        relationship: zod_1.z.string().min(1, "Relationship must be at least 1 character"),
        interesting: zod_1.z.string().min(1, "Interesting must be at least 1 character"),
        city: zod_1.z.string().min(1, "City must be at least 1 character"),
        work: zod_1.z.string().min(1, "Work must be at least 1 character"),
        education: zod_1.z.string().min(1, "Education must be at least 1 character"),
        age: zod_1.z.string().min(1, "Age must be at least 1 character")
    });
    try {
        userSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: err.errors[0].message });
        }
        return res.status(statusCodes_1.default.ERROR).json({ message: "Internal server error" });
    }
};
exports.default = validateUser;
