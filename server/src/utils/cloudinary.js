import CatchAsyncHandaler from "./CatchAsyncHandaler.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import { getBase64 } from "./Helpers.js";

export const UploadFileToCloudinary = async (path, files = []) => {
  const uploadPromise = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        { public_id: uuidv4(), resource_type: "auto" },
        function (error, result) {
          if (error) {
            return reject(error);
          }
          if (result) {
            return resolve(result);
          }
        }
      );
    });
  });

  try {
    const result = await Promise.all(uploadPromise);

    const formatedResult = result.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    return formatedResult;
  } catch (error) {
    console.log("Error in File Upload ===>>>>>>>>>", error);
  }
};
