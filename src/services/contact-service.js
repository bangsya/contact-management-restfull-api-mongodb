import ResponseError from "../error/response-error.js";
import Contact from "../models/contact-models.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (userId, request) => {
  // validasi
  const contact = validate(createContactValidation, request);

  // buat contact baru
  const newContact = new Contact({
    userId: userId,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
  });
  await newContact.save();
  return newContact;
};

const get = async (userId, contactId) => {
  // validasi
  contactId = validate(getContactValidation, contactId);

  // cek apakah contact ada
  const contact = await Contact.findOne(
    {
      userId: userId,
      _id: contactId,
    },
    {
      userId: 0,
    }
  );
  if (!contact) {
    throw new ResponseError(404, "contact not found");
  }
  return contact;
};

const update = async (userId, contactId, request) => {
  // validasi
  const contact = validate(updateContactValidation, request);

  // cek apakah contact ada atau tidak
  const contactToUpdate = await Contact.findOne({
    userId: userId,
    _id: contactId,
  });
  if (!contactToUpdate) {
    throw new ResponseError(404, "contact not found");
  }

  await Contact.updateOne(
    {
      userId: userId,
      _id: contactId,
    },
    {
      $set: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        updatedAt: Date.now(),
      },
    }
  );
  return await Contact.findOne(
    {
      userId: userId,
      _id: contactId,
    },
    {
      userId: 0,
    }
  );
};

const deleteContact = async (userId, contactId) => {
  // validasi
  contactId = validate(getContactValidation, contactId);

  // cek contact ada atau tidak
  const contact = await Contact.findOne({
    userId: userId,
    _id: contactId,
  });
  if (!contact) {
    throw new ResponseError(404, "contact not found");
  }
  // hapus contact
  await Contact.deleteOne({
    userId: userId,
    _id: contactId,
  });
};

const search = async (userId, request) => {
  // validasi
  const searchContact = validate(searchContactValidation, request);

  const skip = (searchContact.page - 1) * searchContact.size;

  const filter = {};
  // harus disertakan userId
  filter.userId = userId;

  // jika ada name, email, phone
  if (searchContact.name) {
    filter.$or = [
      { firstName: { $regex: searchContact.name, $options: "i" } },
      { lastName: { $regex: searchContact.name, $options: "i" } },
    ];
  }
  if (searchContact.email) {
    filter.$and = [{ email: { $regex: searchContact.email, $options: "i" } }];
  }
  if (searchContact.phone) {
    filter.$and = [{ phone: { $regex: searchContact.phone, $options: "i" } }];
  }
  const totalItems = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .select({
      userId: 0,
    })
    .skip(skip)
    .limit(searchContact.size)
    .lean();
  return {
    data: contacts,
    paging: {
      page: searchContact.page,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / searchContact.size),
    },
  };
};

export default { create, get, update, deleteContact, search };
