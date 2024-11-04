const Product = require("../models/fileupload");
const cloudinary = require("cloudinary").v2;
//localFileUpload

exports.localFileUpload = (req, res) => {
  try {
    //fetch file
    const file = req.Product.file;
    console.log("File at request = ", file);

    //path where locally file store (__dirname for current directory)
    let path =
      __dirname + "/Product/" + Date.now() + "." + `${file.name.split(".")[1]}`;

    //file move file.mv(path,feedback)
    file.mv(path, (err) => {
      console.log("Error during file moving in local = ", err);
    });
    res.json({
      success: true,
      message: `File uploaded at ${path}`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error file uploading at local ${error}`,
    });
  }
};

//file uploading to cloudinary

const isFileTypeValid = (type, supportedTypes) => {
  return supportedTypes.includes(type);
};

async function uploadFileCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";

  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUploadCloudynary = async (req, res) => {
  try {
    //data fetch
    const { name, about, price } = req.body;
    const file = req.files.file;

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileTypes = file.name.split(".")[1].toLowerCase();

    isFileTypeValid(fileTypes, supportedTypes);
    if (!isFileTypeValid) {
      return res.json({
        success: false,
        message: "file Type is not Supportive!!!",
      });
    }

    //file format suppoted now upload
    const response = await uploadFileCloudinary(file, "fileuploadzoroz");

    //save entry to dabatbase
    const fileData = await Product.create({
      name,
      about,
      price,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      message: "Image successfully uploaded",
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error during uploading file to cloudinary   !!! ${error}`,
    });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.product = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};
