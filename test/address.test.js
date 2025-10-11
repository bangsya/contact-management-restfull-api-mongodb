import "dotenv/config";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import {
  closeDBTest,
  connectDBTest,
  createTestAddress,
  createTestAddressMany,
  createTestContact,
  createTestUser,
  deleteAllAddressTest,
  deleteAllContactTest,
  deleteAllUserTest,
  getTestContact,
} from "./test.utils.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts/:contactId/addresses", function () {
  beforeAll(async () => {
    await connectDBTest();
  }, 30000);

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await deleteAllAddressTest();
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("Should can create address", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .post(`/api/contacts/${contact._id}/addresses`)
      .set("Authorization", "test")
      .send({
        label: "test",
        street: "Jalan Test",
        city: "Kota Test",
        province: "Provinsi Test",
        country: "Negara Test",
        postalCode: "12345",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(201);
    expect(result.body.data.label).toBe("test");
    expect(result.body.data.street).toBe("Jalan Test");
    expect(result.body.data.city).toBe("Kota Test");
    expect(result.body.data.province).toBe("Provinsi Test");
    expect(result.body.data.country).toBe("Negara Test");
    expect(result.body.data.postalCode).toBe("12345");
    expect(result.body.message).toBeDefined();
    expect(result.body.data).toBeDefined();
  });

  it("Should return 404 if contact not found", async () => {
    const result = await supertest(web)
      .post(`/api/contacts/68e6614a8f11929ab2943db6/addresses`)
      .set("Authorization", "test")
      .send({
        label: "test",
        street: "Jalan Test",
        city: "Kota Test",
        province: "Provinsi Test",
        country: "Negara Test",
        postalCode: "12345",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("Should return 400 if request is invalid", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .post(`/api/contacts/${contact._id}/addresses`)
      .set("Authorization", "test")
      .send({
        label: "test",
        street: "Jalan Test",
        city: "Kota Test",
        province: "Provinsi Test",
        country: "",
        postalCode: "12345",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  beforeAll(async () => {
    await connectDBTest();
  }, 30000);

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });
  afterEach(async () => {
    await deleteAllAddressTest();
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("Should can get address", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${contact._id}/addresses/${contact.addresses[0]._id}`)
      .set("Authorization", "test");
    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.label).toBe("test");
    expect(result.body.data.street).toBe("Jalan Test");
    expect(result.body.data.city).toBe("Kota Test");
    expect(result.body.data.province).toBe("Provinsi Test");
    expect(result.body.data.country).toBe("Negara Test");
    expect(result.body.data.postalCode).toBe("12345");
    expect(result.body.data).toBeDefined();
  });
  it("Should return 404 if contact not found", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .get(
        `/api/contacts/68e6614a8f11929ab2943db6/addresses/${contact.addresses[0]._id}`
      )
      .set("Authorization", "test");
    logger.info("Response:", result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("Should return 404 if address not found", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${contact._id}/addresses/68e6614a8f11929ab2943db6`)
      .set("Authorization", "test");
    logger.info("Response:", result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", function () {
  beforeAll(async () => {
    await connectDBTest();
  }, 30000);

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await deleteAllAddressTest();
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("Should can update address", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${contact._id}/addresses/${contact.addresses[0]._id}`)
      .set("Authorization", "test")
      .send({
        label: "test update",
        street: "Jalan Test Update",
        city: "Kota Test Update",
        province: "Provinsi Test Update",
        country: "Negara Test Update",
        postalCode: "54321",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Address updated successfully");
    expect(result.body.data.label).toBe("test update");
    expect(result.body.data.street).toBe("Jalan Test Update");
    expect(result.body.data.city).toBe("Kota Test Update");
    expect(result.body.data.province).toBe("Provinsi Test Update");
    expect(result.body.data.country).toBe("Negara Test Update");
    expect(result.body.data.postalCode).toBe("54321");
  });

  it("Should return 404 if contact not found", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .put(
        `/api/contacts/68e6614a8f11929ab2943db6/addresses/${contact.addresses[0]._id}`
      )
      .set("Authorization", "test")
      .send({
        label: "test update",
        street: "Jalan Test Update",
        city: "Kota Test Update",
        province: "Provinsi Test Update",
        country: "Negara Test Update",
        postalCode: "54321",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("Should return 404 if address not found", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${contact._id}/addresses/68e6614a8f11929ab2943db6`)
      .set("Authorization", "test")
      .send({
        label: "test update",
        street: "Jalan Test Update",
        city: "Kota Test Update",
        province: "Provinsi Test Update",
        country: "Negara Test Update",
        postalCode: "54321",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("Should return 400 if input invalid", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${contact._id}/addresses/${contact.addresses[0]._id}`)
      .set("Authorization", "test")
      .send({
        label: "test update",
        street: "",
        city: "Kota Test Update",
        province: "Provinsi Test Update",
        country: "Negara Test Update",
        postalCode: "54321",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", function () {
  beforeAll(async () => {
    await connectDBTest();
  }, 30000);

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await deleteAllAddressTest();
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("Should can remove address", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .delete(
        `/api/contacts/${contact._id}/addresses/${contact.addresses[0]._id}`
      )
      .set("Authorization", "test");
    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Address removed successfully");
  });

  it("Should return 404 if contact not found", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .delete(
        `/api/contacts/68e6614a8f11929ab2943db6/addresses/${contact.addresses[0]._id}`
      )
      .set("Authorization", "test");
    logger.info("Response:", result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("Should return 404 if address not found", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .delete(`/api/contacts/${contact._id}/addresses/68e6614a8f11929ab2943db6`)
      .set("Authorization", "test");
    logger.info("Response:", result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses", function () {
  beforeAll(async () => {
    await connectDBTest();
  }, 30000);

  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddressMany();
  });

  afterEach(async () => {
    await deleteAllAddressTest();
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("Should can get all address", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${contact._id}/addresses`)
      .set("Authorization", "test");
    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.length).toBe(3);
  });
  it("Should return 404 if contact not found", async () => {
    const result = await supertest(web)
      .get(`/api/contacts/68e6614a8f11929ab2943db6/addresses`)
      .set("Authorization", "test");
    logger.info("Response:", result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
