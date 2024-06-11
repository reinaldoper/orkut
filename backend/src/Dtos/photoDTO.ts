import { Request, Response } from "express";

class PhotoDto {
  create(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  list(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getPhotoById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  updatePhotos(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export default PhotoDto;
