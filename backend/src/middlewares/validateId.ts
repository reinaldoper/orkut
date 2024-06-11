import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../statusCodes";

const validateId = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    num: z.number().min(1, "Id must be greater than 1"),
  });

  try {
    const { id } = req.params;
    const num = Number(id);
    userSchema.parse({ num });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.errors[0].message });
    }
    return res.status(statusCodes.ERROR).json({ message: "Internal server error" });
  }
}

export default validateId;
