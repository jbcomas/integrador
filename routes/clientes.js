const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/clientes', clienteController.crearCliente);
router.get('/clientes', clienteController.obtenerClientes);
router.post('/sync', clienteController.enqueueSyncTask);



module.exports = router;
