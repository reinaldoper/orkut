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
const rabbitmq_1 = __importDefault(require("../rabbitmq"));
const messagingMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channel = rabbitmq_1.default.getChannel();
        const queue = 'http_requests';
        const message = {
            method: req.method,
            path: req.path,
            body: req.body,
            params: req.params,
            query: req.query
        };
        yield channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(" [x] Sent %s", JSON.stringify(message));
    }
    catch (error) {
        console.error('Failed to send message to RabbitMQ:', error);
    }
    next();
});
exports.default = messagingMiddleware;
