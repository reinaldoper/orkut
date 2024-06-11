"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const usersModel_1 = __importDefault(require("./usersModel"));
class Followings extends sequelize_1.Model {
}
Followings.init({
    id: {
        type: sequelize_1.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    followingId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'followings',
});
usersModel_1.default.hasMany(Followings, { foreignKey: 'userId', as: 'followings' });
Followings.belongsTo(usersModel_1.default, { foreignKey: 'userId', as: 'user' });
usersModel_1.default.hasMany(Followings, { foreignKey: 'followingId', as: 'followingUser' });
Followings.belongsTo(usersModel_1.default, { foreignKey: 'followingId', as: 'followingUser' });
exports.default = Followings;
