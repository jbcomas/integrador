const { parentPort, workerData } = require("worker_threads");
const { handleError } = require("../utils/errorHandler");

const syncWorker = () => {
  try {
    const { data } = workerData;
    syncProductsForClient(data);
  } catch (error) {
    handleError("syncProductsForClient", error);
  }
};

const syncProductsForClient = async (data) => {
  try {
    console.log("Sincronizando productos para el cliente:", data);

    parentPort.postMessage({ message: data });
    process.exit(0);
  } catch (error) {
    handleError("syncProductsForClient", error);
    parentPort.postMessage({ success: false });
    process.exit(0);
  }
};
syncWorker();
