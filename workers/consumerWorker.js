const { logger } = require("../utils/winston");
const {
  enviarMensajeACola,
  consumirCliente,
} = require("../services/rabbitmqService");

const consumeMessages = async () => {
  try {
    const queue = "sync_queue";
    await enviarMensajeACola(queue);
    console.log("Esperando mensajes en la cola", queue);
    await consumirCliente(queue);
  } catch (error) {
    logger.error(`consumeMessages ${error}`);
  }
};

consumeMessages();
