const {
  guardarCliente,
  obtenerTodosLosClientes,
} = require("../services/clienteService");
const { enviarMensajeACola } = require("../services/rabbitmqService");
const { logger } = require("../utils/winston");

exports.crearCliente = async (req, res) => {
  try {
    const cliente = req.body;
    if (!cliente) return res.status(400).send("Falta enviar el cliente");
    let client = await guardarCliente(cliente);
    res.send(client);
  } catch (error) {
    logger.error(`crearCliente, ${error}`);
    res.status(400).send(error);
  }
};

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await obtenerTodosLosClientes();
    res.send(clientes);
  } catch (error) {
    logger.error(`cobtenerClientes, ${error}`);
    res.status(500).send(error);
  }
};
exports.enqueueSyncTask = async (req, res) => {
  try {
    const cliente = req.body;
    const queue = "sync_queue";
    enviarMensajeACola(queue, cliente);
    res.send("Tarea de sincronización encolada");
  } catch (error) {
    logger.error(`enqueueSyncTask, ${error}`);
    res.status(500).send(error);
  }
};
