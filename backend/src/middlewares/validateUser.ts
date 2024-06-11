import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters" ),
    email: z.string().email("Invalid email" ),
    password: z.string().min(6, "Password must be at least 6 characters" ),
    image: z.string().min(1, "Image must be at least 1 character" ),
  });

  try {
    userSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.errors[0].message });
    }
    return res.status(statusCodes.ERROR).json({ message: "Internal server error" });
  }
}

export default validateUser;
