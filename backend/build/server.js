"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const rabbitmq_1 = __importDefault(require("./rabbitmq"));
const messagingMiddleware_1 = __importDefault(require("./middlewares/messagingMiddleware"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const photosRoute_1 = __importDefault(require("./routes/photosRoute"));
const followerRoute_1 = __importDefault(require("./routes/followerRoute"));
const cors = require("cors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express();
app.use(cors());
app.use(express.json());
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield rabbitmq_1.default.init();
            console.log('RabbitMQ connected');
            app.use(messagingMiddleware_1.default);
            app.use('/users', userRoute_1.default);
            app.use('/posts', postRoute_1.default);
            app.use('/category', categoryRoute_1.default);
            app.use('/photos', photosRoute_1.default);
            app.use('/followers', followerRoute_1.default);
        }
        catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    });
}
startServer();
exports.default = app;
