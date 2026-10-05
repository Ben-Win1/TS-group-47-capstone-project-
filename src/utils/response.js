/**
 * Sends a standardized JSON success response.
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {Object|Array} [data=null] - Payload data
 */
const response = (res, statusCode, message, data = null) => {
  const payload = {
    success: true,
    message,
  };

  if (data !== null && data !== undefined) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
};

module.exports = response;