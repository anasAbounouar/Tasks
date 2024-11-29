const Attachment = require("../models/Attachment");
const fs = require('fs');
const path = require('path');

// Upload attachment
exports.uploadAttachment = async (req, res, next) => {
    let { taskId } = req.params;
    taskId = parseInt(taskId);

    if (isNaN(taskId)) {
        return res.status(400).json({ error: `Invalid task ID: ${req.params.taskId}` });
    }

    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const modifiedFileName = req.file.filename;

    try {
        // Create a new attachment associated with the taskId
        const attachment = await Attachment.create({
            taskId,
            fileName: modifiedFileName,
            filePath: path.join('uploads', modifiedFileName), // Corrected file path
        });

        res.status(201).json(attachment);
    } catch (err) {
        console.error("Server Error in Uploading File", err);
        next(err);
    }
};

// Retrieve all attachments for a specific task
exports.getAttachmentsBytaskId = async (req, res, next) => {
    let { taskId } = req.params;
    taskId = parseInt(taskId);

    if (isNaN(taskId)) {
        return res.status(400).json({ error: `Invalid task ID: ${req.params.taskId}` });
    }

    try {
        // Await the result to resolve the promise
        const attachments = await Attachment.find({ taskId }).sort({ uploadedAt: -1 });
        res.json(attachments);
    } catch (err) {
        console.error(`Error fetching attachments for task ID ${taskId}:`, err);
        next(err);
    }
};

// Delete an attachment by attachmentId
exports.deleteAttachmentByAttachmentId = async (req, res, next) => {
    let { taskId, attachmentId } = req.params;
    taskId = parseInt(taskId);

    if (isNaN(taskId)) {
        return res.status(400).json({ error: `Invalid task ID: ${req.params.taskId}` });
    }

    try {
        const attachment = await Attachment.findById(attachmentId);
        if (!attachment) {
            return res.status(404).json({ msg: 'Attachment Not Found' });
        }

        // Delete the file from the file system
        fs.unlink(attachment.filePath, (err) => {
            if (err) {
                console.error('Failed to delete file', err);
            }
        });

        // Remove the attachment from the database
        await attachment.remove();
        res.status(200).json({ msg: "Attachment Deleted Successfully" });
    } catch (err) {
        console.error(`Error deleting attachment with ID ${attachmentId}:`, err);
        next(err);
    }
};
