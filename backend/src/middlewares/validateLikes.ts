import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validateLikes = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    num: z.number().min(1, "Likes must be greater than 1"),
  });

  try {
    const { likes } = req.body;
    const num = Number(likes);
    userSchema.parse({ num });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.errors[0].message });
    }
    return res.status(statusCodes.ERROR).json({ message: "Internal server error" });
  }
}

export default validateLikes;
