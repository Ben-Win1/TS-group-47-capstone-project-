import { validateApiKey } from "../services/apiKey.service.js";

const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key is required",
      });
    }

    const keyData = await validateApiKey(apiKey);

    req.apiKey = keyData;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default authenticateApiKey;