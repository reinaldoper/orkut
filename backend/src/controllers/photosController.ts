import { Response, Request } from 'express';
import photosService from '../service/photosService';
import statusCodes from '../statusCodes';
import PhotoDto from '../Dtos/photoDTO';


class PhotosController implements PhotoDto {
  async create(req: Request, res: Response) {
    try {
      const { id: userId } = req.body.id;
      const photo = await photosService.create(req.body, userId);
      return res.status(statusCodes.CREATED).json({ message: photo });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.UNAUTHORIZED).json({ message: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async list(req: Request, res: Response) {
    const photos = await photosService.getAll();
    return res.status(statusCodes.OK).json({ message: photos });
  }

  async getPhotoById(req: Request, res: Response) {
    const { id } = req.params;
    const photo = await photosService.getById(Number(id));
    return res.status(statusCodes.OK).json({ message: photo });
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id: userId } = req.body.id;
      await photosService.delete(Number(id), userId);
      return res.status(statusCodes.OK).json({ message: 'Success with deleted' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.UNAUTHORIZED).json({ message: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async updatePhotos(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id: userId } = req.body.id;
      const update = await photosService.update(Number(id), req.body, userId)
      return res.status(statusCodes.OK).json({ message: update });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.UNAUTHORIZED).json({ message: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ message: 'An unexpected error occurred' });
      }
    }
  }
}

export default new PhotosController();