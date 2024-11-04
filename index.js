const express = require("express");
const app = express();
require("dotenv").config();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const PORT = 4000;

//middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//database
const dbconnect = require("./config/database");
dbconnect();

//cloudnary connection
const cloudnary = require("./config/cloudinary");
cloudnary.cloudinaryconnect();

//route mount
const uploadrouter = require("./routes/route");
app.use("/v1", uploadrouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
