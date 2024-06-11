import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Categories extends Model {
  declare id: number;
  declare name: string;
}

Categories.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: true,
  },
},
  {
    underscored: true,
    sequelize: db,
    modelName: 'category',
  });

export default Categories;
