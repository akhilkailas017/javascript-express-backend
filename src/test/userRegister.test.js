const request = require("supertest");
const { expect } = require("chai");

const app = require("../index");
const {
  connect,
  clearDatabase,
  closeDatabase,
} = require("./setup/mongoMemory");

describe("user register", function () {
  before(async function () {
    await connect();
  });

  afterEach(async function () {
    await clearDatabase();
  });

  after(async function () {
    await closeDatabase();
  });

  it("should create user with valid credential", async function () {
    const postData = {
      name: "testname",
      email: "test@gmail.com",
      age: 20,
      password: "testpassword",
    };

    const res = await request(app)
      .post("/api/user/register")
      .send(postData)
      .set("Accept", "application/json");
    expect(res.status).to.equal(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("name");
    expect(res.body).to.have.property("email");
    expect(res.body).to.have.property("age");
    expect(res.body).to.have.property("password");
    expect(res.body).to.have.property("role");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("createdAt");
    expect(res.body.name).to.equal(postData.name);
    expect(res.body.email).to.equal(postData.email);
    expect(res.body.age).to.equal(postData.age);
  });
});
