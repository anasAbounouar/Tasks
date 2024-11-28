// backend/models/Category.js

const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

/**
 * Category Model
 * Represents a category/project to which tasks can belong.
 */
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically increments the ID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,    // Name is required
    unique: true,        // Category names must be unique
  },
}, {
    timestamps: true,
    tableName: 'categories',
});

module.exports = Category;
