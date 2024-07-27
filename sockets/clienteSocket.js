const { startWorker } = require("../workers/createWorker");

function configurarSockets(io) {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("nuevoCliente", async (data) => {
      console.log("Nuevo cliente recibido:", data);

      await startWorker(
        { cliente: data, cola: "SincronizacionCliente" },
        "./workers/workers.js"
      );
    });
    socket.emit("respuestaServidor", "mensaje");
    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
}

module.exports = configurarSockets;
