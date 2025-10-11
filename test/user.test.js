import "dotenv/config";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import {
  closeDBTest,
  connectDBTest,
  deleteAllUserTest,
  createTestUser,
} from "./test.utils.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", function () {
  beforeAll(async () => {
    await connectDBTest();
  }, 30000);

  afterEach(async () => {
    await deleteAllUserTest();
  }, 30000);

  afterAll(async () => {
    await closeDBTest();
  }, 30000);

  it("Should can register user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test123",
      name: "Test User",
    });

    logger.info("Response:", result.body);
    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test User");
    expect(result.body.data.password).toBeUndefined();
  });

  it("Should return 400 if username is empty", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "test123",
      name: "Test User",
    });

    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("Should return 400 if password is empty", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "",
      name: "Test User",
    });

    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if username already exists", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test123",
      name: "Test User",
    });
    logger.info("Response:", result.body);
    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test User");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test123",
      name: "Test User",
    });

    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeAll(async () => {
    await connectDBTest();
    await createTestUser();
  });

  afterEach(async () => {
    await deleteAllUserTest();
  }, 30000);

  afterAll(async () => {
    await closeDBTest();
  }, 30000);

  it("should can login user", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test123",
    });

    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
  });

  it("should return 400 if username is empty", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "test123",
    });

    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should can reject if username wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test-wrong",
      password: "test123",
    });

    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should can reject if password wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test-wrong",
    });

    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", function () {
  beforeAll(async () => {
    await connectDBTest();
    await createTestUser();
  });

  afterEach(async () => {
    await deleteAllUserTest();
  });
  afterAll(async () => {
    await closeDBTest();
  });

  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test User");
    expect(result.body.data.password).toBeUndefined();
  });
  it("should return 401 if token is empty", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "");

    logger.info("Response:", result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should return 401 if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "invalid-token");

    logger.info("Response:", result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATH /api/users/current", function () {
  beforeAll(async () => {
    await connectDBTest();
  });
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await deleteAllUserTest();
  });
  afterAll(async () => {
    await closeDBTest();
  });

  it("should can update user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        username: "test2",
        password: "test1234",
        name: "Test User new",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test2");
    expect(result.body.data.name).toBe("Test User new");
    expect(result.body.data.password).toBeUndefined();
  });
  it("should can update name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Test User new",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test User new");
    expect(result.body.data.password).toBeUndefined();
  });
  it("should return 401 if token is empty", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "")
      .send({
        username: "test2",
        password: "test1234",
        name: "Test User new",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should return 401 if username is empty", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        username: "",
        password: "test1234",
        name: "Test User new",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it("should return 401 if username is empty", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        username: "test",
        password: "",
        name: "Test User new",
      });
    logger.info("Response:", result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/users/logout", function () {
  beforeAll(async () => {
    await connectDBTest();
  });
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await deleteAllUserTest();
  });
  afterAll(async () => {
    await closeDBTest();
  });
  it("should can logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    logger.info("Response:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Logout success");
  });
  it("should return 401 if token is empty", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "");

    logger.info("Response:", result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
