const cloundinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {

     cloundinary.config({
        cloud_name: "dy0drevvl",
        api_key: "171974183756795",
        api_secret: "CcdrO8YOB3gAgqZ3p4HOBfcQW6M"
     })

     const cloundinaryResponse = await cloundinary.uploader.upload(file.path)
     return cloundinaryResponse;



    };
    module.exports = {
        uploadFileToCloudinary
    }
