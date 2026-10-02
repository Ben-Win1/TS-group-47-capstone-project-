const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

/**
 * Uploads file buffer to Cloudinary
 */
const uploadToCloudinary = (fileBuffer, folder = 'general') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `baas_storage/${folder}`,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          return reject(new ApiError(500, `Cloudinary Upload Error: ${error.message}`));
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Deletes file from Cloudinary by public ID
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
    return result;
  } catch (error) {
    throw new ApiError(500, `Cloudinary Delete Error: ${error.message}`);
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};