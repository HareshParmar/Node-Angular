const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const item = {
  body: Joi.object().keys({
    itemname: Joi.string().required(),
    price: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  item
};
