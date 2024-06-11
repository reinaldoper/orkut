import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Posts from './postsModel';

class Photos extends Model {
  declare id: number;
  declare title: string;
  declare url: string;
  declare postId: number;
  declare post: Posts;
}

Photos.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: STRING,
    allowNull: true,
  },
  url: {
    type: STRING,
    allowNull: false,
  },
  postId: {
    type: INTEGER,
    allowNull: false,
  },
},
  {
    underscored: true,
    sequelize: db,
    modelName: 'photos',
  });

  Posts.hasMany(Photos, { foreignKey: 'postId', as: 'photos' });
  Photos.belongsTo(Posts, { foreignKey: 'postId', as: 'post' });

export default Photos;
