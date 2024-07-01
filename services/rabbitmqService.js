const connectRabbitMQ = require("../config/rabbitmq");
const { handleError } = require("../utils/errorHandler");
const { guardarCliente } = require("./clienteService");

async function enviarMensajeACola(cola, mensaje) {
  try {
    connectRabbitMQ((channel) => {
      channel.assertQueue(cola, {
        durable: true,
      });
      channel.sendToQueue(cola, Buffer.from(JSON.stringify(mensaje)), {
        persistent: true,
      });
      console.log({ message: "Mensaje enviado a la cola" });
    });
  } catch (error) {
    handleError("enviarMensajeACola", error);
  }
}
async function consumirMensajeCola(cola, connMongoose) {
  try {
    connectRabbitMQ((channel) => {
      channel.consume(cola, async (msg) => {
        if (msg !== null) {
          let dataCliente = JSON.parse(msg.content);
          let newClient = await guardarCliente(dataCliente, connMongoose);
          console.log({
            message: `Cliente creado ${newClient.nombre}`,
          });
          channel.ack(msg);
        }
      });
    });
  } catch (error) {
    handleError("consumirMensajeCola", error);
  }
}
module.exports = {
  enviarMensajeACola,
  consumirMensajeCola,
};
