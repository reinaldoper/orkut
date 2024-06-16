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
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQ {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield amqplib_1.default.connect('amqp://rabbitmq:5672');
                this.channel = yield this.connection.createChannel();
                console.log('Connected to RabbitMQ and channel created');
            }
            catch (error) {
                console.error('Failed to connect to RabbitMQ or create channel:', error);
                throw error;
            }
        });
    }
    static getChannel() {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not initialized');
        }
        return this.channel;
    }
}
RabbitMQ.connection = null;
RabbitMQ.channel = null;
exports.default = RabbitMQ;
