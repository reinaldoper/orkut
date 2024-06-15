import amqp from 'amqplib';

class RabbitMQ {
    private static connection: amqp.Connection | null = null;
    private static channel: amqp.Channel | null = null;

    static async init() {
        try {
            this.connection = await amqp.connect('amqp://rabbitmq:5672');
            this.channel = await this.connection.createChannel();
            console.log('Connected to RabbitMQ and channel created');
        } catch (error) {
            console.error('Failed to connect to RabbitMQ or create channel:', error);
            throw error; 
        }
    }

    static getChannel() {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not initialized');
        }
        return this.channel;
    }
}

export default RabbitMQ;