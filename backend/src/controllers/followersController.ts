import { Response, Request } from "express";
import followerService from "../service/followerService";
import statusCodes from "../statusCodes";
import FollowerDto from "../Dtos/followerDTO";


class FollowerController implements FollowerDto {
  async create(req: Request, res: Response) {
    try {
      const { id: userId } = req.body.id;
      req.body.followerId = userId;
      const follow = await followerService.createFollowers(req.body);
      return res.status(statusCodes.CREATED).json({ message: follow });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.NOT_FOUND).json({ error: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ error: 'An unexpected error occurred' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id: userId } = req.body.id;
      req.body.userId = Number(id);
      req.body.followerId = userId;
      const unfollow = await followerService.deleteFollowers(req.body);
      return res.status(statusCodes.OK).json({ message: unfollow });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(statusCodes.NOT_FOUND).json({ error: error.message });
      } else {
        return res.status(statusCodes.ERROR).json({ error: 'An unexpected error occurred' });
      }
    }
  }

  async getFollowers(req: Request, res: Response) {
    const { id } = req.params;
    const followers = await followerService.getFollowersById(Number(id));
    return res.status(statusCodes.OK).json({ message: followers });
  }

  async getFollowing(req: Request, res: Response) {
    const following = await followerService.getAllFollowers();
    return res.status(statusCodes.OK).json({ message: following });
  }
}

export default new FollowerController();