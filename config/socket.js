const socketIO = require('socket.io');

function configureSocket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

  return io;
}

module.exports = configureSocket;
