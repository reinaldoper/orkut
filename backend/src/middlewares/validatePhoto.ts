import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validatePhoto = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    title: z.string().optional(),
    postId: z.number().min(1, "postId is required" ),
  });

  try {
    userSchema.parse(req.body);
    if (!req.file) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: "Image is required" });
    }
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.errors[0].message });
    }
    return res.status(statusCodes.ERROR).json({ message: "Internal server error" });
  }
}

export default validatePhoto;
