 // Code generated via "Slingshot" 
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Note;
