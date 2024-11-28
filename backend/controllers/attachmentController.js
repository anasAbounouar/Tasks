// backend/controllers/attachmentController.js

const Attachment = require("../models/Attachment");

const fs = require('fs');
const path = require('path');

// exports.XX = async (req, res, next) => {
//     try {

//     } catch (err) {
//         console.error("......", err);
//         next(err);
//     }
// }


//  upload attachment 

exports.uploadAttachment = async (req, res, next) => {
    const { taskId } = req.params;
    
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const modifiedFileName = req.file.filename
    try {
        
        // create a new attachment associated with the taskId
        const attachment = await Attachment.create({
            taskId: parseInt(taskId),
            fileName: modifiedFileName,
            filePath: path.join('uploads', modifiedFileName), // uploads/filename  that is modified by multer middleware

        })

        res.status(201).json(attachment)
        
    } catch (err) {
        console.error("Server Error in Uploading File", err);
        next(err);
    }
}


//  Retrieve all attachments for a specific task

exports.getAttachmentsBytaskId = async (req, res, next) => {
    const { taskId } = req.params;
    try {
        const attachments = Attachment.find({ taskId: parseInt(taskId) }).sort({ uploadedAt: -1 });  
        res.json(attachments);
        
    } catch (err) {
        console.error(`Error fetching attachments for task ID ${taskId}:`, err);
        next(err);
    }
}

// delete an attachment by attachmentId
exports.deleteAttachmentByAttachmentId = async (req, res, next) => {
    const { attachmentId } = req.params;
    try {
        const attachment = Attachment.findById(attachmentId);
        if (!attachment) {
            res.status(404).json({ msg: 'Attachment Not Found' });

        }
        // delete the file from the fileSystem
        fs.unlink(attachment.filePath, (err) => {
            if (err) {
                console.error('failed to delete file', err)

            }
        })
        await attachment.remove();
        res.status(200).json({ msg: "Attachment Deleted Successfuly" });
    } catch (err) {
        console.error(`Error deleting attachment with ID ${attachmentId}:`, err);
        next(err);
    }
}

