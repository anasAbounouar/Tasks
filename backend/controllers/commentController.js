

// exports.XX = async (req, res, next) => {
//     try {

//     } catch (err) {
//         console.error("......", err);
//         next(err);
//     }
// }

const mongoose = require("mongoose")
const Comment = require("../models/Comment")

// add a comment to a task 

exports.addComment = async (req, res, next) => {
    const { comment } = req.body
    const { taskId } = req.params;
    try {
        if (!comment) {
            return res.status(400).json({msg:"Comment content  is required"})
        }
        // create a new Comment associated with a taskId
        const newComment =   new Comment({
            taskId:parseInt(taskId),
            comment,
        })
        await newComment.save()
        res.status(201).json(newComment);

    } catch (err) {
       console.error(`Error adding comment to task ID ${taskId}:`, err);
        next(err);
    }
}


// retrieve all comments for a specific Task



exports.getAllComments = async (req, res, next) => {
    const { taskId } = req.params;
    try {
          // Find all comments associated with the taskId, sorted by newest first
        const comments = await Comment.find({ taskId: parseInt(taskId) }).sort({ createdAt: -1 });

        res.json(comments);

    } catch (err) {
        console.error(`Error fetching comments for task ID ${taskId}:`, err);
        next(err);
    }
}



// Delete a comment by commentId


exports.deleteCommentById = async (req, res, next) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            res.status(404).json({ msg: "Comment Not Found" });

        }
        
        res.json({ msg: 'Comment Deleted Successfully' });

    } catch (err) {
        console.error(`Error deleting comment with ID ${commentId}:`, err);
        next(err);
    }
}

