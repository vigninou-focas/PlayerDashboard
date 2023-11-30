const request = require("supertest");
const app = require("../app");

describe("User API", () => {
  // Test GET endpoint
  it("should get all users", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
