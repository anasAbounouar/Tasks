const multer = require("multer");
const path = require("path");
const express = require("express");
const attachmentController = require("../controllers/attachmentController");

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Specify the folder where to store uploaded files
  },
  filename: (req, file, cb) => {
    // Create a unique filename for each uploaded file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  },
});



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
