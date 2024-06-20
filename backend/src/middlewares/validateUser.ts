import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    genro: z.string().min(3, "Genro must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    relationship: z.string().min(1, "Relationship must be at least 1 character"),
    interesting: z.string().min(1, "Interesting must be at least 1 character"),
    country: z.string().min(1, "Country must be at least 1 character"),
    city: z.string().min(1, "City must be at least 1 character"),
    work: z.string().min(1, "Work must be at least 1 character"),
    education: z.string().min(1, "Education must be at least 1 character"),
    age: z.string().min(1, "Age must be at least 1 character"),
    phone_number: z.string().min(1, "Phone number must be at least 1 character"),
    birthdate: z.string().min(1, "Birthdate must be at least 1 character"),
    bio: z.string().min(1, "Bio must be at least 1 character"),
    hobbies: z.string().min(1, "Hobbies must be at least 1 character"),
    favorite_music: z.string().min(1, "Favorite music must be at least 1 character"),
    favorite_movies: z.string().min(1, "Favorite movie must be at least 1 character"),
    favorite_books: z.string().min(1, "Favorite book must be at least 1 character"),
    language: z.string().min(1, "Languages must be at least 1 character"),
    favorite_food: z.string().min(1, "Favorite food must be at least 1 character"),
  });

  try {
    userSchema.parse(req.body);
    
    const file = req.file;
    
    if (!file) {
      return res.status(statusCodes.BAD_REQUEST).json({ error: "Image is required" });
    }

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(statusCodes.BAD_REQUEST).json({ error: err.errors[0].message });
    }
    return res.status(statusCodes.ERROR).json({ error: "Internal server error" });
  }
}

export default validateUser;
