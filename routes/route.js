const express = require("express");
const router = express.Router();

const {
  localFileUpload,
  imageUploadCloudynary,
  allProducts,
  product,
} = require("../controller/fileUpload");

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUploadCloudynary);
router.get("/allProducts", allProducts);
router.get("/product/:id", product);
module.exports = router;
