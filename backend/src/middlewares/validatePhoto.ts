import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validatePhoto = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    title: z.string().optional(),
    postId: z.string().min(1, "postId is required" ),
  });

  try {
    userSchema.parse(req.body);
    const file = req.file;
    
    if (!file) {
      return res.status(statusCodes.BAD_REQUEST).json({ error: "Url of the image is required" });
    }
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(statusCodes.BAD_REQUEST).json({ error: err.errors[0].message });
    }
    return res.status(statusCodes.ERROR).json({ error: "Internal server error" });
  }
}

export default validatePhoto;
