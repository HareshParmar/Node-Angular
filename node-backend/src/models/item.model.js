const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const itemSchema = mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);


/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
