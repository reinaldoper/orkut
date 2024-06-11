"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const usersModel_1 = __importDefault(require("./usersModel"));
const categoriesModel_1 = __importDefault(require("./categoriesModel"));
class Posts extends sequelize_1.Model {
}
Posts.init({
    id: {
        type: sequelize_1.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    likes: {
        type: sequelize_1.INTEGER,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        references: {
            model: usersModel_1.default,
            key: 'id'
        }
    },
    categoryId: {
        type: sequelize_1.INTEGER,
        allowNull: true,
        references: {
            model: categoriesModel_1.default,
            key: 'id'
        }
    }
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'posts',
});
usersModel_1.default.hasMany(Posts, { foreignKey: 'userId', as: 'posts' });
Posts.belongsTo(usersModel_1.default, { foreignKey: 'userId' });
Posts.belongsTo(categoriesModel_1.default, { foreignKey: 'categoryId' });
categoriesModel_1.default.hasMany(Posts, { as: 'category', foreignKey: 'categoryId' });
exports.default = Posts;
