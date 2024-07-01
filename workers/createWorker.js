const { Worker } = require("worker_threads");

const startWorker = (data, file) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(file, {
      workerData: { data },
    });
    const workerId = worker.threadId;
    worker.on("message", (msg) => {
      console.log({ ...msg, workerId });
      resolve();
    });
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        console.log({ message: `Worker terminado con code ${code}` });
    });
  });
};

module.exports = {
  startWorker,
};
