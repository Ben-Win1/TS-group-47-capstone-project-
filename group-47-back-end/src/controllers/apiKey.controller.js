import {
  createApiKey,
  getApiKeys,
  revokeApiKey,
} from "../services/apiKey.service.js";

const create = async (req, res) => {
  try {
    const {
      project,
      name,
      expiresAt,
    } = req.body;

    const apiKey = await createApiKey({
      project,
      name,
      expiresAt,
    });

    return res.status(201).json({
      success: true,
      message: "API key generated successfully",
      data: apiKey,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { project } = req.query;

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const apiKeys = await getApiKeys(project);

    return res.status(200).json({
      success: true,
      data: apiKeys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const revoke = async (req, res) => {
  try {
    const { project } = req.query;

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const apiKey = await revokeApiKey(
      req.params.id,
      project
    );

    return res.status(200).json({
      success: true,
      message: "API key revoked successfully",
      data: apiKey,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  create,
  getAll,
  revoke,
};