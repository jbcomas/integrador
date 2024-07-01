const { parentPort, workerData } = require("worker_threads");
const { logger } = require("../utils/winston");

const syncWorker = () => {
  try {
    const { data } = workerData;
    syncProductsForClient(data);
  } catch (error) {
    logger.error(`syncWorker ${error}`);
  }
};

const syncProductsForClient = async (data) => {
  try {
    console.log("Sincronizando productos para el cliente:", data);

    parentPort.postMessage({ message: data });
    process.exit(0);
  } catch (error) {
    logger.error(`syncProductsForClient ${error}`);
    parentPort.postMessage({ success: false });
    process.exit(0);
  }
};
syncWorker();
