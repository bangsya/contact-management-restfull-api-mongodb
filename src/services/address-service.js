import ResponseError from "../error/response-error.js";
import Contact from "../models/contact-models.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const checkContactMustBeExist = async (userId, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await Contact.findOne({
    userId,
    _id: contactId,
  });
  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }
  return contactId;
};

const create = async (userId, contactId, request) => {
  contactId = await checkContactMustBeExist(userId, contactId);
  const address = validate(createAddressValidation, request);
  await Contact.findByIdAndUpdate(
    contactId,
    {
      $push: {
        addresses: address,
      },
    },
    {
      new: true,
    }
  );
  const updateAddress = await Contact.findOne({
    userId,
    _id: contactId,
  });
  return updateAddress.addresses[updateAddress.addresses.length - 1];
};

const get = async (userId, contactId, addressId) => {
  contactId = await checkContactMustBeExist(userId, contactId);
  addressId = validate(getAddressValidation, addressId);
  const contact = await Contact.findOne({
    userId,
    _id: contactId,
  });
  const address = contact.addresses.id(addressId);
  if (!address) {
    throw new ResponseError(404, "Address not found");
  }
  return address;
};

const update = async (userId, contactId, addressId, request) => {
  contactId = await checkContactMustBeExist(userId, contactId);
  addressId = validate(getAddressValidation, addressId);
  let address = validate(updateAddressValidation, request);
  const contactAddress = await Contact.findOne({
    userId,
    _id: contactId,
    addresses: { $elemMatch: { _id: addressId } },
  });
  if (!contactAddress) {
    throw new ResponseError(404, "Address not found");
  }
  await Contact.findOneAndUpdate(
    {
      userId,
      _id: contactId,
      addresses: { $elemMatch: { _id: addressId } },
    },
    {
      $set: {
        "addresses.$.label": address.label,
        "addresses.$.street": address.street,
        "addresses.$.city": address.city,
        "addresses.$.province": address.province,
        "addresses.$.country": address.country,
        "addresses.$.postalCode": address.postalCode,
      },
    },
    {
      new: true,
    }
  );
  const updateAddress = await Contact.findOne(
    {
      userId,
      _id: contactId,
      addresses: { $elemMatch: { _id: addressId } },
    },
    {
      "addresses.$": 1,
    }
  );
  return updateAddress.addresses[0];
};

const remove = async (userId, contactId, addressId) => {
  contactId = await checkContactMustBeExist(userId, contactId);
  addressId = validate(getAddressValidation, addressId);
  const contactAddress = await Contact.findOne({
    userId,
    _id: contactId,
    addresses: { $elemMatch: { _id: addressId } },
  });
  if (!contactAddress) {
    throw new ResponseError(404, "Address not found");
  }
  await Contact.findByIdAndUpdate(
    { userId, _id: contactId, addresses: { $elemMatch: { _id: addressId } } },
    {
      $pull: {
        addresses: { _id: addressId },
      },
    }
  );
};

const list = async (userId, contactId) => {
  contactId = await checkContactMustBeExist(userId, contactId);
  const contact = await Contact.findOne({
    userId,
    _id: contactId,
  });
  return contact.addresses;
};

export default {
  create,
  get,
  update,
  remove,
  list,
};
