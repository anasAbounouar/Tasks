const taskController = require("../controllers/taskController");
const express = require("express");
const router = express.Router();




// @route Get  /api/tasks
// @desc Retrieve ALL tasks
// @access Public

router.get("/", taskController.getAllTasks);


// @route Get  /api/tasks/:taskId
// @desc Retrieve  task By taskId
// @access Public

router.get("/:taskId", taskController.getTaskById);



// @route Post  /api/tasks
// @desc add  task 
// @access Public

router.get("/", taskController.addTask);



// @route Put  /api/tasks/:taskId
// @desc update  task by taskId 
// @access Public

router.get("/:taskId", taskController.updateTaskById);



// @route Delete  /api/tasks/:taskId
// @desc delete  task by taskId 
// @access Public

router.get("/:taskId", taskController.deleteTaskById);


module.exports = router;