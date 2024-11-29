const commentController = require("../controllers/commentController");
const express = require("express");
const router = express.Router();



// @route Get / api / tasks /: taskId / comments
// @desc get all comments of a task
// @access Public

router.get("/:taskId/comments", commentController.getAllComments);

// @route Delete / api / tasks /: taskId / comments/:commentId
// @desc delete a comment  of a task by commentId
// @access Public

router.delete("/:taskId/comments/:commentId", commentController.deleteCommentByCommentId);

// @route Post  / api / tasks /: taskId / comments
// @desc add a comment for a task 
// @access Public

router.post("/:taskId/comments", commentController.addComment);
module.exports = router;


