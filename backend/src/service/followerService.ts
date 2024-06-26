import FollowersModel from "../database/models/followersModel";
import  UserModel from "../database/models/usersModel";
import TFollowers from "../types/TTypeFollowers";


class FollowerService {

  constructor(){}

  async createFollowers(data: TFollowers): Promise<TFollowers> {
    const { userId, followerId } = data;
    const user = await UserModel.findByPk(userId);
    const follower = await UserModel.findByPk(followerId);
    if (!user || !follower) {
      throw new Error('User not found');
    }
    const create =  await FollowersModel.create({
      userId,
      followerId
    });

    return create as unknown as TFollowers;
  }

  async getFollowersById(userId: number): Promise<TFollowers[]> {
    const followers = await FollowersModel.findAll({
      where: {
        userId
      },
      include: [
        {
          model: UserModel,
          as: 'follower',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    return followers as unknown as TFollowers[];
  }

  async getFollowingById(followerId: number): Promise<TFollowers[]> {
    const following = await FollowersModel.findAll({
      where: {
        followerId,
      },
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    return following as unknown as TFollowers[] ;
  }

  async deleteFollowers(data: TFollowers): Promise<number> {
    const { userId, followerId } = data;
    const user = await UserModel.findByPk(userId);
    const follower = await UserModel.findByPk(followerId);
    if (!user || !follower) {
      throw new Error('User not found');
    }
    return await FollowersModel.destroy({
      where: {
        userId,
        followerId
      }
    });
  }

  async getFollowersByUserIdAndFollowerId(userId: number, followerId: number): Promise<TFollowers | null> {
    const followers = await FollowersModel.findOne({
      where: {
        userId,
        followerId
      }
    });

    return followers as unknown as TFollowers;
  }

  async getAllFollowers(): Promise<TFollowers[]> {
    const followers = await FollowersModel.findAll();
    return followers as unknown as TFollowers[];
  }
}

export default new FollowerService();