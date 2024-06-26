import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validatePhotoUpdate = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    title: z.string().optional(),
    url: z.string().min(1, "Photo is required" )
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

export default validatePhotoUpdate;
