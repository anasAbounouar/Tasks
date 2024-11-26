
// backend/models/Task.js
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Category =require("./Category")

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        

    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    dueDate: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
        allowNull:true,

    },
    priority: {
        type: DataTypes.STRING,
        default: "medium",
        allowNull: false,
        
    }


}, { timestamps: true,
    tableName: 'Tasks',})

// define associations: A category has many tasks

Category.hasMany(Task, { foreignKey: 'categoryId', onDelete: 'SET NULL' });

// define associations : a task belongs to one category

Task.belongsTo(Category, { foreignKey: 'categoryId' });



module.exports=Task