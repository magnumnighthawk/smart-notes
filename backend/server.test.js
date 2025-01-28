// Code generated via "Slingshot"
process.env.NODE_ENV = "test"; // Set environment to 'test'

const request = require("supertest");
const app = require("./server");
const { sequelize } = require("./db"); // Ensure sequelize is correctly imported

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Notes API", () => {
  it("should create a new note", async () => {
    const response = await request(app)
      .post("/api/notes")
      .send({
        title: "Test Note",
        content: "This is a test note",
        category: { name: "Test" },
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test Note");
  });

  // Add more tests for other operations
});
