import { Response, Request } from "express";
import followingService from "../service/followingService";
import statusCodes from "../statusCodes";


class FollowingController {
  async createFollowing(req: Request, res: Response) {
    try {
      const { userToFollowId } = req.body;
      const { id: userId } = req.body.id;
      await followingService.createFollowing(userId, userToFollowId);
      res.status(statusCodes.CREATED).json({ message: "Followed successfully" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.NOT_FOUND).json({ error: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ error: 'An unexpected error occurred' });
      }
    }
  }

  async getFollowingByUserId(req: Request, res: Response) {
    const { id: userId } = req.body.id;
    const following = await followingService.getFollowingByUserId(userId);
    res.status(statusCodes.OK).send({ message: following });
  }

  async getFollowersById(req: Request, res: Response) {
    const { id } = req.params;
    const followers = await followingService.getFollowingById(Number(id));
    res.status(statusCodes.OK).send({ message: followers });
  }

  async deleteFollowingById(req: Request, res: Response) {
    try {
      const { id: userId } = req.body.id;
      const following = await followingService.deleteFollowing(userId);
      res.status(statusCodes.OK).send({ message: following });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.NOT_FOUND).json({ error: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ error: 'An unexpected error occurred' });
      }
    }
  }
}

export default new FollowingController();