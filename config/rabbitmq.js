const amqp = require("amqplib/callback_api");
const { logger } = require("../utils/winston");

const RABBITMQ_URL = "amqp://localhost";


function connectRabbitMQ(callback) {
  amqp.connect(RABBITMQ_URL, (error0, connection) => {
    if (error0) {
      logger.error(`connectRabbitMQ error1, ${error0}`);
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        logger.error(`connectRabbitMQ error1, ${error1}`);

        throw error1;
      }
      callback(channel);
    });
  });
}

module.exports = connectRabbitMQ;

