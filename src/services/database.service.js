import Database from "../models/database.js";

const createData = async ({ project, collection, data }) => {
  const record = await Database.create({
    project,
    collection,
    data,
  });

  return record;
};

const getData = async ({
  project,
  collection,
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;

  const filter = {
    project,
  };

  if (collection) {
    filter.collection = collection;
  }

  const [records, total] = await Promise.all([
    Database.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),

    Database.countDocuments(filter),
  ]);

  return {
    records,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getDataById = async (id, project) => {
  const record = await Database.findOne({
    _id: id,
    project,
  });

  if (!record) {
    throw new Error("Data not found");
  }

  return record;
};

const updateData = async (id, project, updateData) => {
  const record = await Database.findOneAndUpdate(
    {
      _id: id,
      project,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!record) {
    throw new Error("Data not found");
  }

  return record;
};

const deleteData = async (id, project) => {
  const record = await Database.findOneAndDelete({
    _id: id,
    project,
  });

  if (!record) {
    throw new Error("Data not found");
  }

  return record;
};

const queryData = async ({
  project,
  collection,
  field,
  value,
}) => {
  const filter = {
    project,
    collection,
  };

  if (field && value !== undefined) {
    filter[`data.${field}`] = value;
  }

  const records = await Database.find(filter);

  return records;
};

export {
  createData,
  getData,
  getDataById,
  updateData,
  deleteData,
  queryData,
};