import { Request, Response, NextFunction } from 'express';
import RabbitMQ from '../rabbitmq';
import statusCodes from '../statusCodes';

const messagingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channel = RabbitMQ.getChannel();
        const queue = 'http_requests';
        const message = {
            method: req.method,
            path: req.path,
            body: req.body,
            params: req.params,
            query: req.query
        };

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(" [x] Sent %s", JSON.stringify(message));
    } catch (error) {
        res.status(statusCodes.ERROR).json({ error: 'Failed to send message to RabbitMQ' })
    }

    next();
};

export default messagingMiddleware;