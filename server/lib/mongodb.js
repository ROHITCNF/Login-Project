const mongoose = require("mongoose");
const mongoDbUrl =
  "mongodb+srv://rohitcnf:ORYDxEPlIssCAg5d@cluster0.ijh1sdd.mongodb.net/?retryWrites=true&w=majority";

const connectToDb = () => {
  mongoose
    .connect(mongoDbUrl)
    .then((db) => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectToDb;
