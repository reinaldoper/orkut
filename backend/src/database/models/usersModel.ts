import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare image: string;
}

Users.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  image: {
    type: STRING,
    allowNull: false,
  },
},
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
  });

export default Users;
