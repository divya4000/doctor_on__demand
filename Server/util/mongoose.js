const mongoose = require("mongoose");
require("dotenv").config();

// var mongoURL ="mongodb+srv://a_shrimali_19:Ashish@1111@cluster0.ogzhh.mongodb.net/doctorOnDemand";
// "mongodb+srv://a_shrimali_19:Ashish%401111@cluster0.ogzhh.mongodb.net/doctorOnDemand"
var mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection successful");
});
module.exports = mongoose;
