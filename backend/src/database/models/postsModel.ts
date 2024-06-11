import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Users from './usersModel';
import CategoryModel from './categoriesModel';

class Posts extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare likes: number;
  declare userId: number;
}

Posts.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  content: {
    type: STRING,
    allowNull: false,
  },
  likes: {
    type: INTEGER,
    allowNull: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  categoryId: {
    type: INTEGER,
    allowNull: true, 
    references: {
      model: CategoryModel,
      key: 'id'
    }
  }
}, 
{
  underscored: true,
  sequelize: db,
  modelName: 'posts',
});

Users.hasMany(Posts, { foreignKey: 'userId', as: 'posts' });
Posts.belongsTo(Users, { foreignKey: 'userId' });

Posts.belongsTo(CategoryModel, { foreignKey: 'categoryId' });
CategoryModel.hasMany(Posts, { as: 'category', foreignKey: 'categoryId' });

export default Posts;
