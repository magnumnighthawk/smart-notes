// Import necessary modules
const express = require('express');
const { Note, Category } = require('../db');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const HfInference = require('@huggingface/inference').HfInference;

// Initialize Express Router
const router = express.Router();

// Initialize Hugging Face Inference with your API key
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

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

// Suggest category based on content using Hugging Face
router.post('/suggest-category', async (req, res) => {
  const { content } = req.body;

  try {
    // Use the request method for a custom call
    const response = await hf.request({
      model: 'facebook/bart-large-mnli',
      inputs: content,
      parameters: { candidate_labels: ['Work', 'Personal', 'Ideas'] },
    });

    // Check if the response is in the expected format
    if (response.labels) {
      const suggestedCategory = response.labels[0];
      res.json({ suggestedCategory });
    } else {
      console.error('Unexpected response format:', response);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error during Hugging Face API call:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'Failed to suggest category.' });
  }
});

module.exports = router;
