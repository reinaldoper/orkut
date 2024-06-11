import { Model, INTEGER } from 'sequelize';
import db from '.';
import User from './usersModel';

class Followers extends Model {
  declare id: number;
  declare userId: number;
  declare followerId: number;
}

Followers.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
  },
},
  {
    underscored: true,
    sequelize: db,
    modelName: 'followers',
  });

User.hasMany(Followers, { foreignKey: 'userId', as: 'followers' });
Followers.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Followers, { foreignKey: 'followerId', as: 'follower' });
Followers.belongsTo(User, { foreignKey: 'followerId', as: 'follower' });

export default Followers;
