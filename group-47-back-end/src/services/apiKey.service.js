import ApiKey from "../models/apikey.js";
import generateApiKey from "../utils/generateApiKey.js";

const createApiKey = async ({
  project,
  name,
  expiresAt,
}) => {
  const key = generateApiKey();

  const apiKey = await ApiKey.create({
    key,
    project,
    name,
    expiresAt: expiresAt || null,
  });

  return apiKey;
};

const getApiKeys = async (project) => {
  const apiKeys = await ApiKey.find({ project })
    .select("-__v")
    .sort({ createdAt: -1 });

  return apiKeys;
};

const revokeApiKey = async (id, project) => {
  const apiKey = await ApiKey.findOneAndUpdate(
    {
      _id: id,
      project,
    },
    {
      isActive: false,
    },
    {
      new: true,
    }
  );

  if (!apiKey) {
    throw new Error("API key not found");
  }

  return apiKey;
};

const validateApiKey = async (key) => {
  const apiKey = await ApiKey.findOne({
    key,
    isActive: true,
  });

  if (!apiKey) {
    throw new Error("Invalid or revoked API key");
  }

  if (
    apiKey.expiresAt &&
    apiKey.expiresAt < new Date()
  ) {
    throw new Error("API key has expired");
  }

  return apiKey;
};

export {
  createApiKey,
  getApiKeys,
  revokeApiKey,
  validateApiKey,
};