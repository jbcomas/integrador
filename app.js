require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const configurarSockets = require("./sockets/clienteSocket");
const router = require("./routes/clientes");
const { connMongoose } = require("./config/database");
const bodyParser = require("body-parser");
const { handleError } = require("./utils/errorHandler");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
configurarSockets(io);
connMongoose();

app.use(bodyParser.json());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Integrador ERP - Tienda Nube está corriendo");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use((err) => {
  handleError("Error Middleware", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
});
