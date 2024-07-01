const mongoose = require("mongoose");

let conn = "mydatabase"

const connMongoose = (conn) => {

  mongoose.connect(`mongodb://localhost:27017/${conn}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  new Promise(() => {
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected to MongoDB with Mongoose");
    });
  });
};

module.exports = {
  connMongoose,
};
