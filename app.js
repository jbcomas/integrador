require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const configurarSockets = require("./sockets/clienteSocket");
const router = require("./routes/clientes");
const { connMongoose } = require("./config/database");
const bodyParser = require("body-parser");
const { logger } = require("./utils/winston");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
configurarSockets(io);
connMongoose("mydatabase");

app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Integrador ERP - Tienda Nube está corriendo ");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  process.stdout.write(`\nServidor corriendo en el puerto ${PORT} \n`);
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  logger.error(`Error Middleware, ${err.message}`);
  res.status(500).send("Hubo un error en el servidor");
});
/* eslint-enable no-unused-vars */

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at:, ${promise}, "reason:", ${reason}`);
});
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception thrown: ${err}`);
});
