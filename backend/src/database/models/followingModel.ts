import { Model, INTEGER } from 'sequelize';
import db from '.';
import User from './usersModel';

class Followings extends Model {
  declare id: number;
  declare userId: number;
  declare followingId: number;
}

Followings.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  followingId: {
    type: INTEGER,
    allowNull: false,
  },
},
  {
    underscored: true,
    sequelize: db,
    modelName: 'followings',
  });

User.hasMany(Followings, { foreignKey: 'userId', as: 'followings' });
Followings.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Followings, { foreignKey: 'followingId', as: 'followingUser' });
Followings.belongsTo(User, { foreignKey: 'followingId', as: 'followingUser' });

export default Followings;
