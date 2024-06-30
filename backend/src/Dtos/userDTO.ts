import { Request, Response } from "express";

class UserDto {
  create(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  login(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  list(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  findById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getUserFollowerById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getUserFollowingById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export default UserDto;
