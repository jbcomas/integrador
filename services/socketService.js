function enviarMensaje(socket, evento, mensaje) {
    socket.emit(evento, mensaje);
  }
  module.exports = {
    enviarMensaje,
  };
  