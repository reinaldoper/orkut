import UserModel from '../database/models/usersModel'
import TTypeUser from '../types/TTypeUser'
import PostModel from '../database/models/postsModel'
import PhotoModel from '../database/models/photosModel'
import TFollowers from '../types/TTypeFollowers'
import FollowersModel from '../database/models/followersModel'
import FollowingModel from '../database/models/followingModel'
import TFollowings from '../types/TTypeFollowing'
import CategoriesModel from '../database/models/categoriesModel'
import fs from 'fs'


class UserService {

  constructor() {
  }

  createUser = async (user: TTypeUser, image: Express.Multer.File | undefined): Promise<TTypeUser | string> => {
    const { name, genro, email, password, relationship, interesting, country,
      city, work, age, education } = user
    try {
      const newUser = await UserModel.create({
        attributes: { exclude: ['password'] },
        name,
        genro,
        email,
        password,
        image: image ? image.path: '',
        relationship,
        interesting,
        country,
        city,
        work,
        age,
        education,
      });
      return newUser as unknown as TTypeUser;
    } catch (error) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      } else {
        return 'An unexpected error occurred'
      }
    }
  }

  deleteUserById = async (id: number): Promise<string> => {
    try {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      fs.unlinkSync(user.image);
      await UserModel.destroy({ where: { id } });
      return 'User deleted successfully';
    } catch (error) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return 'An unknown error occurred';
    }
  }

  getAll = async (): Promise<TTypeUser[]> => {
    const users = await UserModel.findAll({
      attributes: { exclude: ['password'] },
      include: [{
        model: PostModel,
        as: 'posts',
        include: [
          {
            model: PhotoModel,
            as: 'photos'
          }
        ]
      }]
    });
    return users as unknown as TTypeUser[];
  }

  getUserId = async (id: number): Promise<TTypeUser> => {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: PostModel,
        as: 'posts',
        include: [
          {
            model: PhotoModel,
            as: 'photos',
          },
          {
            model: CategoriesModel,
            as: 'category',
          }
        ]
      }]
    });
    return user as unknown as TTypeUser;
  }

  getUserEmail = async (email: string): Promise<TTypeUser> => {
    const user = await UserModel.findOne({
      where: { email },
    });
    

    return user as unknown as TTypeUser;
  }

  getUserFollowersById = async (id: number): Promise<TFollowers> => {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: FollowersModel,
        as: 'followers',
      }]
    })

    return user as unknown as TFollowers;
  }


  getUserFollowingsById = async (id: number): Promise<TFollowings> => {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: FollowingModel,
        as: 'followingUser',
      }]
    })

    return user as unknown as TFollowings;
  }

}


export default new UserService();