
const attachmentController = require('../controllers/attachmentController');
const express = require('express');
const router = express.Router();

const multer = require("multer");




// Configure Multer for file uploads

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
  

// @Route Get / api / tasks /: taskId / attachments
// @desc get all attachments for a Task
// @access Public

router.get("/", attachmentController.getAttachmentsBytaskId);



// @Route Delete / api / tasks /: taskId / attachments/:attachmentId
// @desc delete  an  attachments for a Task by attachmentId
// @access Public

router.delete("/:attachmentId", attachmentController.deleteAttachmentByAttachmentId);


// @Route Post  / api / tasks /: taskId / attachments
// @desc uppload    an  attachments for a Task
// @access Public

router.post("/", upload.single('file'), attachmentController.uploadAttachment)


module.exports = router;