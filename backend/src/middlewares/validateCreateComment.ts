import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validateCreateComments = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    postId: z.number().min(1, "PostId is required"),
    comments: z.string().min(3, "Comments is required"),
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

export default validateCreateComments;
