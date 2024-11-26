
// backend/models/Attachment.js
const mongoose = require('mongoose');

/**
 * Attachment Schema
 * Represents an attachment/file associated with a specific task.
 */
const attachementSchema = new mongoose.Schema({
    taskId: {
        type: Number,   // ID of the associated task (from sql db)
        require: true,  // taskId is required
    },
    fileName: {
        type: String,
        required:true, // Name of the file
        
    },
    filePath: {
        type: String,
        required:true, // Path where the file is stored on the server
    },
    uploadedAt: {
        type: Date,
        default:Date.now // Automatically set to current date/time
    }

    
})

module.exports = mongoose.model('Attachement', attachementSchema);