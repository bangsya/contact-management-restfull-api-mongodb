import "dotenv/config";
import supertest from "supertest";
import {
  closeDBTest,
  connectDBTest,
  createTestContact,
  createTestContactMany,
  createTestUser,
  deleteAllContactTest,
  deleteAllUserTest,
  getTestContact,
} from "./test.utils.js";
import { logger } from "../src/application/logging.js";
import { web } from "../src/application/web.js";

describe("POST /api/contacts", function () {
  beforeAll(async () => {
    await connectDBTest();
  });
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("should can create contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test contact",
        lastName: "test",
        email: "test@example.com",
        phone: "081234567890",
      });

    logger.info(result.body);
    expect(result.status).toBe(201);
    expect(result.body.data.firstName).toBe("test contact");
    expect(result.body.data.lastName).toBe("test");
    expect(result.body.data.email).toBe("test@example.com");
    expect(result.body.data.phone).toBe("081234567890");
    expect(result.body.data.createdAt).toBeDefined();
    expect(result.body.data.updatedAt).toBeDefined();
  });

  it("should can reject if email is invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test contact",
        lastName: "test",
        email: "test",
        phone: "081234567890",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should can reject if phone is invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test contact",
        lastName: "test",
        email: "test@example.com",
        phone: "0812345678901234567890",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:id", function () {
  beforeAll(async () => {
    await connectDBTest();
  });
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact._id}`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.firstName).toBe("test contact");
    expect(result.body.data.lastName).toBe("test contact");
    expect(result.body.data.email).toBe("testcontact@example.com");
    expect(result.body.data.phone).toBe("081234567890");
    expect(result.body.data.createdAt).toBeDefined();
    expect(result.body.data.updatedAt).toBeDefined();
  });

  it("should can reject if contact not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/68e6614a8f11929ab2943db6`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:id", function () {
  beforeAll(async () => {
    await connectDBTest();
  });
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("should can update contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact._id}`)
      .set("Authorization", "test")
      .send({
        _id: testContact._id,
        firstName: "test contact new",
        lastName: "test contact new",
        email: "testcontactnew@example.com",
        phone: "081234567890",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Contact updated successfully");
    expect(result.body.data.firstName).toBe("test contact new");
    expect(result.body.data.lastName).toBe("test contact new");
    expect(result.body.data.email).toBe("testcontactnew@example.com");
    expect(result.body.data.phone).toBe("081234567890");
    expect(result.body.data.createdAt).toBeDefined();
    expect(result.body.data.updatedAt).toBeDefined();
  });

  it("should can reject if contact not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/68e6614a8f11929ab2943db6`)
      .set("Authorization", "test")
      .send({
        _id: testContact._id,
        firstName: "test contact new",
        lastName: "test contact new",
        email: "testcontactnew@example.com",
        phone: "081234567890",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should can reject if input is invalid", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact._id}`)
      .set("Authorization", "test")
      .send({
        _id: testContact._id,
        firstName: "test contact new",
        lastName: "test contact new",
        email: "testcontactnew@example.com",
        phone: "0812345678901234567890",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:id", function () {
  beforeAll(async () => {
    await connectDBTest();
  });
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete(`/api/contacts/${testContact._id}`)
      .set("Authorization", "test");

    logger.info(result.body);
    testContact = await getTestContact();
    expect(testContact).toBeNull();
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Contact deleted successfully");
  });

  it("should can reject if contact not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .delete(`/api/contacts/68e6614a8f11929ab2943db6`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", function () {
  beforeAll(async () => {
    await connectDBTest();
  });
  beforeEach(async () => {
    await createTestUser();
    await createTestContactMany();
  });
  afterEach(async () => {
    await deleteAllContactTest();
    await deleteAllUserTest();
  });

  afterAll(async () => {
    await closeDBTest();
  });

  it("should can search contact", async () => {
    const result = await supertest(web)
      .get(`/api/contacts`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(2);
    expect(result.body.paging.totalItems).toBe(15);
  });

  it("should can search contact by page", async () => {
    const result = await supertest(web)
      .get(`/api/contacts`)
      .set("Authorization", "test")
      .query({
        page: 2,
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.totalPages).toBe(2);
    expect(result.body.paging.totalItems).toBe(15);
  });
  it("should can search contact by first name", async () => {
    const result = await supertest(web)
      .get(`/api/contacts`)
      .set("Authorization", "test")
      .query({
        name: "test contact 1",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });

  it("should can search contact by email", async () => {
    const result = await supertest(web)
      .get(`/api/contacts`)
      .set("Authorization", "test")
      .query({
        email: "testcontact1",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });
  it("should can search contact by phone", async () => {
    const result = await supertest(web)
      .get(`/api/contacts`)
      .set("Authorization", "test")
      .query({
        phone: "081234567891",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });
});
