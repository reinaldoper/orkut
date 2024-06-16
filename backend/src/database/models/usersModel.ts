import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare image: string;
  declare relationship: string;
  declare interesting: string;
  declare city: string;
  declare work: string;
  declare education: string;
  declare age: string;
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
  relationship: {
    type: STRING,
    allowNull: false,
  },
  interesting: {
    type: STRING,
    allowNull: false,
  },
  city: {
    type: STRING,
    allowNull: false,
  },
  work: {
    type: STRING,
    allowNull: false,
  },
  education: {
    type: STRING,
    allowNull: false,
  },
  age: {
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
