const cloudnary = require("cloudinary").v2;
const { Sequelize } = require("sequelize");
const ChatSchema = require("../models/chats")
require("dotenv").config();
//localfileupload = handler function

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudnary.uploader.upload(file.tempFilePath, options);
}

// image upload on cloudnary
exports.imageUpload = async (req, res) => {
  try {

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    //is file formate suppported
    const respone = await uploadFileToCloudinary(file, "naveenCode");
    console.log(respone);

    return res.json({
      success: true,
      result:respone.secure_url,
      message: "image successfuly uploaded",
    });
    
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};