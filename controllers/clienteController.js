const {
  guardarCliente,
  obtenerTodosLosClientes,
} = require("../services/clienteService");
const { enviarMensajeACola } = require("../services/rabbitmqService");
const { handleError } = require("../utils/errorHandler");

exports.crearCliente = async (req, res) => {
  try {
    const cliente = req.body;
    let client = await guardarCliente(cliente);
    res.send(client);
  } catch (error) {
    handleError("crearCliente", error);
    res.status(400).send(error);
  }
};

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await obtenerTodosLosClientes();
    res.send(clientes);
  } catch (error) {
    handleError("obtenerClientes", error);
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
    handleError("enqueueSyncTask", error);
    res.status(500).send(error);
  }
};
