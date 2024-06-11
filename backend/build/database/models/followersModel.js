"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const usersModel_1 = __importDefault(require("./usersModel"));
class Followers extends sequelize_1.Model {
}
Followers.init({
    id: {
        type: sequelize_1.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    followerId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'followers',
});
usersModel_1.default.hasMany(Followers, { foreignKey: 'userId', as: 'followers' });
Followers.belongsTo(usersModel_1.default, { foreignKey: 'userId', as: 'user' });
usersModel_1.default.hasMany(Followers, { foreignKey: 'followerId', as: 'follower' });
Followers.belongsTo(usersModel_1.default, { foreignKey: 'followerId', as: 'follower' });
exports.default = Followers;
