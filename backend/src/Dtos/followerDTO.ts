import { Request, Response } from "express";

class FollowerDto {
  create(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getFollowers(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getFollowing(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export default FollowerDto;
