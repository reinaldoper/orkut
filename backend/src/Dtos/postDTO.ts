import { Request, Response } from "express";

class PostDto {
  create(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  list(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getPostById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  deletePostById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  update(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  updatePartial(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export default PostDto;
