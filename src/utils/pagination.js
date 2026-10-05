/**
 * Parses page and limit query strings into numbers with safe defaults.
 */
const getPagination = (pageQuery, limitQuery, defaultLimit = 10) => {
  const page = Math.max(1, parseInt(pageQuery, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(limitQuery, 10) || defaultLimit));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Formats data and total count into a standard paginated response object.
 */
const formatPaginatedResponse = (data, total, page, limit) => {
  return {
    items: data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  getPagination,
  formatPaginatedResponse,
};