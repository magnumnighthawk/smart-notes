const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize, Note, Category, initializeDatabase } = require("../db");
const notesRouter = require("./notes");

const app = express();
app.use(bodyParser.json());
app.use("/api/notes", notesRouter);

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await initializeDatabase();

  // Add test data
  const category = await Category.create({ name: "Test Category" });
  await Note.create({
    id: "1",
    title: "Test Note",
    content: "This is a test note.",
    categoryId: category.id,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Notes API", () => {
  it("should create a new note", async () => {
    const response = await request(app)
      .post("/api/notes")
      .send({
        title: "New Test Note",
        content: "This is a new test note.",
        category: { name: "Test Category" }, // Ensure category is an object
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Test Note");
  });

  it("should fetch all notes", async () => {
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((note) => {
      expect(note).toHaveProperty("category");
      expect(note.category).toHaveProperty("name");
    });
  });

  it("should update a note", async () => {
    const note = await Note.findOne();
    if (!note) {
      console.error("Note not found");
    }
    const category = await Category.create({ name: "Updated Test Category" });
    const response = await request(app).put(`/api/notes/${note.id}`).send({
      title: "Updated Test Note",
      content: "This is an updated test note.",
      category,
    });
    if (response.status !== 200) {
      console.error(response.body);
    }
    expect(response.status).toBe(200);
    const updatedNote = await Note.findByPk(note.id, { include: Category });
    expect(updatedNote.title).toBe("Updated Test Note");
    expect(updatedNote.Category.name).toBe("Updated Test Category");
  });

  it("should delete a note", async () => {
    const note = await Note.findOne();
    const response = await request(app).delete(`/api/notes/${note.id}`);
    expect(response.status).toBe(204);
    const deletedNote = await Note.findByPk(note.id);
    expect(deletedNote).toBeNull();
  });

  it("should fetch all categories", async () => {
    const response = await request(app).get("/api/notes/categories");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
