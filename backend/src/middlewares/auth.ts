import { Request, Response, NextFunction } from "express";
import statusCodes from "../statusCodes";
import jwt from 'jsonwebtoken';
import userService from "../service/userService";

const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: "Authorization is required" });
  }
  const decoded = jwt.verify(authHeader, 'secretKey') as { email: string, id: number };
  const user = await userService.getUserEmail(decoded.email);
  if (!user) {
    return res.status(statusCodes.NOT_FOUND).json({ message: "User not found" });
  }
  req.body.id = decoded;
  next();
 } catch (error) {
  return res.status(statusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
 }
};


export default auth;