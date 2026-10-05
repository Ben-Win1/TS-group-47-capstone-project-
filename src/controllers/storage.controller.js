const File = require('../models/File');
const asyncHandler = require('../utils/asyncHandler');
const response = require('../utils/response');

const getStorageStats = asyncHandler(async (req, res) => {
  const projectId = req.project._id;

  const stats = await File.aggregate([
    { $match: { projectId } },
    {
      $group: {
        _id: null,
        totalFiles: { $sum: 1 },
        totalSize: { $sum: '$size' },
      },
    },
  ]);

  const data = stats.length > 0 ? stats[0] : { totalFiles: 0, totalSize: 0 };
  delete data._id;

  return response(res, 200, 'Storage statistics retrieved successfully', data);
});

module.exports = {
  getStorageStats,
};