import FollowingsModel from "../database/models/followingModel";
import UsersModel from "../database/models/usersModel";
import TFollowing from "../types/TTypeFollowing";

class FollowingService {
  constructor() {}

  async createFollowing(userId: number, followingId: number): Promise<TFollowing> {
    const user = await UsersModel.findByPk(userId);
    const following = await UsersModel.findByPk(followingId);
    if (!user || !following) {
      throw new Error('User not found');
    }
    const create = await FollowingsModel.create({
      userId,
      followingId
    });
    return create as unknown as TFollowing;
  }

  async getFollowingByUserId(userId: number): Promise<TFollowing> {
    const following = await FollowingsModel.findAll({
      where: {
        userId
      }
    });
    return following as unknown as TFollowing;
  }

  async getFollowingById(followingId: number): Promise<TFollowing> {
    const following = await FollowingsModel.findAll({
      where: {
        followingId
      }
    });
    return following as unknown as TFollowing;
  }

  async deleteFollowing(userId: number): Promise<string> {
    const user = await UsersModel.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await FollowingsModel.destroy({
      where: {
        userId,
      }
    });

    return 'Following deleted';
  }
}


export default new FollowingService();