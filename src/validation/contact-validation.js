import Joi from "joi";

const createContactValidation = Joi.object({
  firstName: Joi.string().max(100).required().messages({
    "string.empty": "first name is not allowed to be empty",
    "any.required": "first name is not allowed to be empty",
  }),
  lastName: Joi.string().max(100).optional().messages({
    "string.empty": "last name is not allowed to be empty",
    "any.required": "last name is not allowed to be empty",
  }),
  email: Joi.string().email().max(200).required(),
  phone: Joi.string().max(20).required(),
  address: Joi.array().items(Joi.string().max(200)).optional(),
});

const getContactValidation = Joi.string().required();

const updateContactValidation = Joi.object({
  _id: Joi.string().required(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().email().max(200).optional(),
  phone: Joi.string().max(20).optional(),
  address: Joi.array().items(Joi.string().max(200)).optional(),
});

const searchContactValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().positive().default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
  searchContactValidation,
};
