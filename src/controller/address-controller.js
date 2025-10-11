import addressService from "../services/address-service.js";

const create = async (req, res, next) => {
  try {
    const result = await addressService.create(
      req.user._id,
      req.params.contactId,
      req.body
    );
    res.status(201).json({
      message: "Address created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await addressService.get(
      req.user._id,
      req.params.contactId,
      req.params.addressId
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await addressService.update(
      req.user._id,
      req.params.contactId,
      req.params.addressId,
      req.body
    );
    res.status(200).json({
      message: "Address updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await addressService.remove(
      req.user._id,
      req.params.contactId,
      req.params.addressId
    );
    res.status(200).json({
      data: "Address removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await addressService.list(
      req.user._id,
      req.params.contactId
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  update,
  remove,
  list,
};
