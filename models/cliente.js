const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: String,
  email: String,
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
