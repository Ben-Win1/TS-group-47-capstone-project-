import {
  createData,
  getData,
  getDataById,
  updateData,
  deleteData,
  queryData,
} from "../services/database.service.js";

const create = async (req, res) => {
  try {
    const { project, collection, data } = req.body;

    const record = await createData({
      project,
      collection,
      data,
    });

    return res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: record,
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
    const {
      project,
      collection,
      page = 1,
      limit = 10,
    } = req.query;

    const result = await getData({
      project,
      collection,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      data: result.records,
      pagination: result.pagination,
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
    const { project } = req.query;

    const record = await getDataById(
      req.params.id,
      project
    );

    return res.status(200).json({
      success: true,
      data: record,
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
    const { project } = req.query;

    const record = await updateData(
      req.params.id,
      project,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: record,
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
    const { project } = req.query;

    await deleteData(
      req.params.id,
      project
    );

    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const query = async (req, res) => {
  try {
    const {
      project,
      collection,
      field,
      value,
    } = req.query;

    if (!project || !collection) {
      return res.status(400).json({
        success: false,
        message: "Project and collection are required",
      });
    }

    const records = await queryData({
      project,
      collection,
      field,
      value,
    });

    return res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
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
  query,
};