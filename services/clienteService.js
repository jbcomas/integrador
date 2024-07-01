const Cliente = require("../models/cliente");
const { logger } = require("../utils/winston");

exports.guardarCliente = async (clienteData, connMongoose) => {
  try {
    connMongoose("mydatabase");
    const cliente = new Cliente(clienteData);
    let newClient = await cliente.save();
    return newClient;
  } catch (error) {
    logger.error(`guardarCliente, ${error}`);
  }
};

exports.obtenerTodosLosClientes = async () => {
  try {
    const clientes = await Cliente.find({});
    return clientes;
  } catch (error) {
    logger.error(`obtenerTodosLosClientes, ${error}`);
  }
};
