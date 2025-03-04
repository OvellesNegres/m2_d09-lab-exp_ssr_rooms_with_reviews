const mongoose = require("mongoose");
require("dotenv/config")

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/project2";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
