import { Request, Response } from "express";

class CategoryDto {
  create(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  findAll(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  findById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  update(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export default CategoryDto;
