const mongoose = require("mongoose");

require("dotenv").config();

const dbconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Databse connected successfully!!");
    })
    .catch((err) => {
      console.log("Error ocucure: ", err);
      process.exit(1);
    });
};

module.exports = dbconnect;
