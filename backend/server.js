// Code generated via "Slingshot" 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');
const { initializeDatabase } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', notesRouter);

// Only start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5002;

  initializeDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
