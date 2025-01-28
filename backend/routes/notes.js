// Code generated via "Slingshot" 
const express = require('express');
const { Note, Category } = require('../db');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

const router = express.Router();

// Transform the notes to include 'category' with lowercase casing
const transformedNote = (note) => ({
  id: note.id,
  title: note.title,
  content: note.content,
  category: note.Category,
  createdAt: note.createdAt,
  updatedAt: note.updatedAt,
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll({ include: Category });
    res.json(notes.map(transformedNote));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let categoryInstance = await Category.findOne({ where: { name: category.name } });
    if (!categoryInstance) {
      categoryInstance = await Category.create({ name: category.name });
    }
    const newNote = await Note.create({
      id: uuidv4(),
      title,
      content,
      categoryId: categoryInstance.id,
    });
    res.status(201).json(transformedNote(newNote));
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).send({ error: 'Note not found' });
    }
    const { title, content, category } = req.body;
    note.title = title;
    note.content = content;
    let categoryInstance = await Category.findOne({ where: { name: category.name } });
    if (!categoryInstance) {
      categoryInstance = await Category.create({ name: category.name });
    }
    note.categoryId = categoryInstance.id;
    await note.save();
    res.status(200).send(transformedNote(note));
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Note.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Get all categories or search categories by query
router.get('/categories', async (req, res) => {
  try {
    const { query } = req.query;
    const where = query ? { name: { [Op.like]: `%${query}%` } } : {};
    const categories = await Category.findAll({ where });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
