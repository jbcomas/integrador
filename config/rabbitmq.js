const amqp = require("amqplib/callback_api");
const { handleError } = require("../utils/errorHandler");
const RABBITMQ_URL = "amqp://localhost";
// "amqp://${process.env.USER_RABBIT_AWS}:${process.env.PASS_RABBIT_AWS}@${process.env.RABBIT_HOST_AWS}";
function connectRabbitMQ(callback) {
  amqp.connect(RABBITMQ_URL, (error0, connection) => {
    if (error0) {
      handleError("connectRabbitMQ error0", error0);

      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        handleError("connectRabbitMQ error1", error1);

        throw error1;
      }
      callback(channel);
    });
  });
}

module.exports = connectRabbitMQ;

// return new Promise(async(resolve,reject)=>{
//   try {
//       const connection=await amqp.connect(`amqp://${process.env.USER_RABBIT_AWS}:${process.env.PASS_RABBIT_AWS}@${process.env.RABBIT_HOST_AWS}`);
//       console.log("conecto con rabbit!")
//       const channel= await connection.createConfirmChannel();
//       console.log("creo canal con rabbit!")
//       return resolve({
//           connection,
//           channel
//       })
//   } catch (error) {
//       console.error(error)
//       return reject(error)
//   }
// })
