const httpStatus = require('http-status');
const { Item } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Item
 * @param {Object} body
 * @returns {Promise<Item>}
 */
const createItem = async (body) => {
  return Item.create(body);
};

/**
 * Query for items
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryItems = async (filter, options) => {
  const items = await Item.paginate(filter, options);
  return items;
};

/**
 * Delete user by id
 * @param {ObjectId} itemId
 * @returns {Promise<Item>}
 */
const deleteItemById = async (itemId) => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await item.remove();
  return item;
};

/**
 * Get Item by id
 * @param {ObjectId} id
 * @returns {Promise<Item>}
 */
const getItemById = async (id) => {
  return Item.findById(id);
};

/**
 * Get Items by user id
 * @param {ObjectId} id
 * @returns {Promise<Item>}
 */
const getUserItems = async (id) => {
  return Item.find(id);
};

module.exports = {
  createItem,
  queryItems,
  deleteItemById,
  getItemById,
  getUserItems
};
