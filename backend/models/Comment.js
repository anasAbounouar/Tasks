
const mongoose = require('mongoose');



/**
 * Comment Schema
 * Represents a comment associated with a specific task.
 */

const commentSchema = new mongoose.Schema({
    taskId: { 
        type: Number, // ID of the associated task from sql db 
        required:true // taskId is required
    },
    comment: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default:Date.now // Automatically set to current date/time
    }

})

module.exports = mongoose.model('Comment', commentSchema);