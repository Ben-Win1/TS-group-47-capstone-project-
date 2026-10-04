import Project from "../models/project.js";

const createProject = async ({ name, description, owner }) => {
  const project = await Project.create({
    name,
    description,
    owner,
  });

  return project;
};

const getProjects = async (owner) => {
  const projects = await Project.find({ owner })
    .sort({ createdAt: -1 });

  return projects;
};

const getProjectById = async (projectId, owner) => {
  const project = await Project.findOne({
    _id: projectId,
    owner,
  });

  if (!project) {
    throw new Error("Project not found or access denied");
  }

  return project;
};

const updateProject = async (
  projectId,
  owner,
  updateData
) => {
  const project = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    throw new Error("Project not found or access denied");
  }

  return project;
};

const deleteProject = async (projectId, owner) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    owner,
  });

  if (!project) {
    throw new Error("Project not found or access denied");
  }

  return project;
};

export {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};