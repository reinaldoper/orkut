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
        genro: zod_1.z.string().min(3, "Genro must be at least 3 characters"),
        email: zod_1.z.string().email("Invalid email"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        relationship: zod_1.z.string().min(1, "Relationship must be at least 1 character"),
        interesting: zod_1.z.string().min(1, "Interesting must be at least 1 character"),
        country: zod_1.z.string().min(1, "Country must be at least 1 character"),
        city: zod_1.z.string().min(1, "City must be at least 1 character"),
        work: zod_1.z.string().min(1, "Work must be at least 1 character"),
        education: zod_1.z.string().min(1, "Education must be at least 1 character"),
        age: zod_1.z.string().min(1, "Age must be at least 1 character"),
        phone_number: zod_1.z.string().min(1, "Phone number must be at least 1 character"),
        birthdate: zod_1.z.string().min(1, "Birthdate must be at least 1 character"),
        bio: zod_1.z.string().min(1, "Bio must be at least 1 character"),
        hobbies: zod_1.z.string().min(1, "Hobbies must be at least 1 character"),
        favorite_music: zod_1.z.string().min(1, "Favorite music must be at least 1 character"),
        favorite_movies: zod_1.z.string().min(1, "Favorite movie must be at least 1 character"),
        favorite_books: zod_1.z.string().min(1, "Favorite book must be at least 1 character"),
        language: zod_1.z.string().min(1, "Languages must be at least 1 character"),
        favorite_food: zod_1.z.string().min(1, "Favorite food must be at least 1 character"),
    });
    try {
        userSchema.parse(req.body);
        const file = req.file;
        if (!file) {
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
exports.default = validateUser;
