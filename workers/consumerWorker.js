const amqp = require("amqplib/callback_api");
const { startWorker } = require("./createWorker");
const { handleError } = require("../utils/errorHandler");

const consumeMessages = () => {
  try {
    amqp.connect("amqp://localhost", (err, connection) => {
      if (err) throw err;
      connection.createChannel((err, channel) => {
        if (err) throw err;
        const queue = "sync_queue";

        channel.assertQueue(queue, { durable: true });
        channel.prefetch(1);
        console.log("Esperando mensajes en la cola", queue);

        channel.consume(
          queue,
          async (msg) => {
            if (msg !== null) {
              const clientData = JSON.parse(msg.content.toString());
              try {
                await startWorker(clientData, "./workers/syncWorker.js");
                channel.ack(msg);
              } catch (error) {
                console.error("Error al procesar el mensaje:", error);
                channel.nack(msg);
              }
            }
          },
          { noAck: false }
        );
      });
    });
  } catch (error) {
    handleError("consumeMessages", error);
  }
};

consumeMessages();
