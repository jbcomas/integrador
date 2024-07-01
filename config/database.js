const mongoose = require("mongoose");

const connMongoose = () => {
  mongoose.connect("mongodb://localhost:27017/mydatabase", {
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
