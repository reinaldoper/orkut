"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const postsModel_1 = __importDefault(require("./postsModel"));
class Photos extends sequelize_1.Model {
}
Photos.init({
    id: {
        type: sequelize_1.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    url: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    postId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'photos',
});
postsModel_1.default.hasMany(Photos, { foreignKey: 'postId', as: 'photos' });
Photos.belongsTo(postsModel_1.default, { foreignKey: 'postId', as: 'post' });
exports.default = Photos;
