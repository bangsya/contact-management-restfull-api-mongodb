import Joi from "joi";

const createAddressValidation = Joi.object({
  label: Joi.string().required().max(100),
  street: Joi.string().optional().max(250),
  city: Joi.string().optional().max(100),
  province: Joi.string().optional().max(100),
  country: Joi.string().required().max(100),
  postalCode: Joi.string().optional().max(100),
});

const getAddressValidation = Joi.string().required();

const updateAddressValidation = Joi.object({
  label: Joi.string().required().max(100),
  street: Joi.string().optional().max(250),
  city: Joi.string().optional().max(100),
  province: Joi.string().optional().max(100),
  country: Joi.string().optional().max(100),
  postalCode: Joi.string().optional().max(100),
});

export {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
};
