import contactService from "../services/contact-service.js";

const create = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const result = await contactService.create(userId, req.body);
    res.status(201).json({
      message: "Contact created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contactId = req.params.id;
    const result = await contactService.get(userId, contactId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contactId = req.params.id;
    const result = await contactService.update(userId, contactId, req.body);
    res.status(200).json({
      message: "Contact updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    await contactService.deleteContact(req.user._id, req.params.id);
    res.status(200).json({
      data: "Contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const request = {
      page: req.query.page,
      size: req.query.size,
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
    };
    const result = await contactService.search(userId, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  update,
  deleteContact,
  search,
};
