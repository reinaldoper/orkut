import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters" ),
    content: z.string().min(3, "Content must be at least 3 characters" ),
  });

  try {
    userSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(statusCodes.BAD_REQUEST).json({ error: err.errors[0].message });
    }
    return res.status(statusCodes.ERROR).json({ error: "Internal server error" });
  }
}

export default validatePost;
