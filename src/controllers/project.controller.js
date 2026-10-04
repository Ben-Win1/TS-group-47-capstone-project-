import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/project.service.js";

const create = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await createProject({
      name,
      description,
      owner: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
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
    const projects = await getProjects(req.user.userId);

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const project = await getProjectById(
      req.params.id,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const project = await updateProject(
      req.params.id,
      req.user.userId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteProject(
      req.params.id,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
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
  getOne,
  update,
  remove,
};