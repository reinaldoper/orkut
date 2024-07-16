import { Model, STRING, INTEGER } from 'sequelize';
import Posts from './postsModel';
import db from '.';

class Comments extends Model {
  declare id: number;
  declare comments: string;
  declare postId: number;
  declare post: Posts;
}

Comments.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  postId: {
    type: INTEGER,
    allowNull: false,
  },
  comments: {
    type: STRING,
    allowNull: true,
  },
},
  {
    underscored: true,
    sequelize: db,
    modelName: 'comments',
  });

  Posts.hasMany(Comments, { foreignKey: 'postId', as: 'comments' });
  Comments.belongsTo(Posts, { foreignKey: 'postId', as: 'post' });

export default Comments;
