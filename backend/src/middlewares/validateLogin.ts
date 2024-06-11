import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    email: z.string().email("Invalid email" ),
    password: z.string().min(6, "Password must be at least 6 characters" )
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

export default validateLogin;
