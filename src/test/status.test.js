const request = require("supertest");
const { expect } = require("chai");

const app = require("../index");
const {
  connect,
  clearDatabase,
  closeDatabase,
} = require("./setup/mongoMemory");

describe("GET /status", function () {
  before(async function () {
    await connect();
  });

  afterEach(async function () {
    await clearDatabase();
  });

  after(async function () {
    await closeDatabase();
  });

  it("should return ok", async function () {
    const res = await request(app).get("/status");

    expect(res.status).to.equal(200);
    expect(res.text).to.equal("ok");
  });
});
