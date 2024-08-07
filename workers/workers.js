const { parentPort, workerData } = require("worker_threads");
const {
  enviarMensajeACola,
  consumirMensajeCola,
} = require("../services/rabbitmqService");
const { connMongoose } = require("../config/database");
const { logger } = require("../utils/winston");

const syncProductsForClient = async () => {
  try {
    const { data } = workerData;
    const { cliente, cola } = data;

    parentPort.postMessage({ message: "worker inicio" });
    await enviarMensajeACola(cola, cliente, parentPort);

    await consumirMensajeCola(cola, connMongoose);
  } catch (error) {
    logger.error(`syncProductsForClient ${error}`);
    parentPort.postMessage({ success: false });
  }
};
syncProductsForClient();
