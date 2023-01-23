const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { itemService } = require('../services');
const { Parser } = require('json2csv');

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v && v != null));
}

const createItem = catchAsync(async (req, res) => {
  const user = await itemService.createItem(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUserItems = catchAsync(async (req, res) => {
  const filter = removeEmpty(pick(req.body, ['itemname', 'price', 'userId']));
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await itemService.queryItems(filter, options);
  res.send(result);
});

const getItem = catchAsync(async (req, res) => {
  const user = await itemService.getItemById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(user);
});

const deleteItem = catchAsync(async (req, res) => {
  await itemService.deleteItemById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const exportcsv = catchAsync(async (req, res) => {
  const result = await itemService.getUserItems(req.body);
  const fields = [
    {
      label: 'Item Name',
      value: 'itemname',
    },
    {
      label: 'Price',
      value: 'price',
    },
    {
      label: 'User Id',
      value: 'userId',
    },
  ];

  const json2csv = new Parser({ fields: fields });
  const csv = json2csv.parse(result);
  res.attachment('data.csv');
  res.send(csv);
});

module.exports = {
  createItem,
  getUserItems,
  getItem,
  deleteItem,
  exportcsv,
};
