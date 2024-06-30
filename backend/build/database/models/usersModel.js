"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        type: sequelize_1.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    genro: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    relationship: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    interesting: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    work: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    education: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    birthdate: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    bio: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    hobbies: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    favorite_movies: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    favorite_books: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    favorite_music: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    language: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    favorite_food: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'users',
});
exports.default = Users;
