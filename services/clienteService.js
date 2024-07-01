const Cliente = require("../models/cliente");
const { handleError } = require("../utils/errorHandler");

exports.guardarCliente = async (clienteData, connMongoose) => {
  try {
    connMongoose();
    const cliente = new Cliente(clienteData);
    let newClient = await cliente.save();
    return newClient;
  } catch (error) {
    handleError("guardarCliente", error);
  }
};

exports.obtenerTodosLosClientes = async () => {
  try {
    const clientes = await Cliente.find({});
    return clientes;
  } catch (error) {
    handleError("obtenerTodosLosClientes", error);
  }
};
