const request = require("supertest");
const { expect } = require("chai");

const app = require("../index");
const {
  connect,
  clearDatabase,
  closeDatabase,
} = require("./setup/mongoMemory");

describe("admin auth", function () {
  before(async function () {
    await connect();
  });

  afterEach(async function () {
    await clearDatabase();
  });

  after(async function () {
    await closeDatabase();
  });

  it("should get access token and refresh token after admin login", async function () {
    const postData = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const res = await request(app)
      .post("/api/admin/login")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("accessToken");
    expect(res.body).to.have.property("refreshToken");
  });

  it("should return 400 when invalid credential provided for admin login", async function () {
    const postData = {
      email: "invalid",
      password: "invalid",
    };

    const res = await request(app)
      .post("/api/admin/login")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(400);
  });

  it("should return 400 when blank password provided for admin login", async function () {
    const postData = {
      email: "admin@gmail.com",
      password: "",
    };

    const res = await request(app)
      .post("/api/admin/login")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(400);
  });

  it("should return 400 when blank email provided for admin login", async function () {
    const postData = {
      email: "",
      password: "admin",
    };

    const res = await request(app)
      .post("/api/admin/login")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(400);
  });

  it("should return 400 when both email and password are blank for admin login", async function () {
    const postData = {
      email: "",
      password: "",
    };

    const res = await request(app)
      .post("/api/admin/login")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(400);
  });

  it("should return 400 when password not passes in request body for admin login", async function () {
    const postData = {
      email: "admin@gmail.com",
    };

    const res = await request(app)
      .post("/api/admin/login")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(400);
  });

  it("should return 400 when email not passes in request body for admin login", async function () {
    const postData = {
      password: "admin",
    };

    const res = await request(app)
      .post("/api/admin/login")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(400);
  });

  it("should return 400 when no in request body for admin login", async function () {
    const postData = {};

    const res = await request(app)
      .post("/api/admin/login")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(400);
  });
});
