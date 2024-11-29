const attachmentController = require('../controllers/attachmentController');
const express = require('express');
const router = express.Router();
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this points to the correct folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

// @Route GET /api/tasks/:taskId/attachments
// @desc Get all attachments for a Task
// @access Public
router.get("/:taskId/attachments", attachmentController.getAttachmentsBytaskId);

// @Route DELETE /api/tasks/:taskId/attachments/:attachmentId
// @desc Delete an attachment for a Task by attachmentId
// @access Public
router.delete("/:taskId/attachments/:attachmentId", attachmentController.deleteAttachmentByAttachmentId);

// @Route POST /api/tasks/:taskId/attachments
// @desc Upload an attachment for a Task
// @access Public
router.post("/:taskId/attachments", upload.single('file'), attachmentController.uploadAttachment);

module.exports = router;
