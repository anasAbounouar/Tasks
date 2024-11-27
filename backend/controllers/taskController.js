// backend/controllers/taskController.js

const Task = require("../models/Task");
const Category=require("../models/Category")


// exports.XX = async (req, res, next) => {
//     try {

//     } catch (err) {
//         console.error("......", err);
//         next(err);
//     }
// }


// create a new task 

exports.addTask = async (req, res, next) => {
    const {priority , dueDate, description, title, category } = req.body
    try {
        let categoryInstance = null;
       
        if (category) {
            // case Where  the category already exists, keep it 
            categoryInstance = await Category.findOne({where:{name:category}})
            
            if (!categoryInstance) {
                // create a new category if it does not  exist
                categoryInstance = await Category.create({ name: category });

                
            }
            
            
        }
        // anyway, create the task with  or without a category 
        const task = await Task.create({
            priority, dueDate, description, title, 
            categoryId: categoryInstance?categoryInstance.id: null
        })
        

        
        res.status(201).json(task);


    } catch (err) {
        console.error("Error in creating Task ", err);
        next(err);
        
    }
}



// Retrieve all tasks

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({
            include: [
                {
                    model: Category,
                    attributes: ['name'] // fetch only the category name 
                }
            ],
            order:[['createdAt','DESC'],['priority','ASC']] // order by creation date descending  and priority
        });
        res.json(tasks);

    } catch (err) {
        console.error("Error in fetching tasks ", err);
        next(err);
    }
}


// retrieve a specefic task by id

exports.getTaskById = async (req, res, next) => {
    const taskId = parseInt(req.params.taskId);
    try {
        // Find the task by primary key , including its category
        const task = await Task.findByPk(taskId, {
            include: [
                {
                    model: Category,
                    attributes:['name']
                }
            ]
        });
        if (!task) {
            return res.status(404).json({ msg: "Task Not Found" });

        }
        res.json(task);
    } catch (err) {
        console.error(`Error fetching task with id ${taskId}`, err);
        next(err);
    }
}

// Update Task by Id

exports.updateTaskById = async (req, res, next) => {
    const taskId =parseInt(req.params.taskId);
    const { title, description, dueDate, priority, category } = req.body;
    try {
        // Find task to update 
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ msg: "Task Not Found" });

            
        }

        let categoryInstance = task.categoryId



        if (category) {
            // check if category already exists
            let existingCategory  = await Category.findOne({ where: { name: category } });
            if (existingCategory) {
                // if exists, keep it 
                categoryInstance = existingCategory.id;
            } else {
                // create new category because it doesnt exist
                const newCategory = await Category.create({ name: category });
                categoryInstance = newCategory.id;
                

            }
            
        }
        
        // update Task fields


        task.title = title || task.title 
        task.description = description || task.description 
        task.dueDate = dueDate || task.dueDate 
        task.priority = priority || task.priority 
        task.categoryId = categoryInstance
        await task.save();
        res.json(task);


    } catch (err) {
        console.error(`Error updating Task with Id${taskId}`, err);
        next(err);
    }
}


// Delete task by TaskId

exports.deleteTaskById = async (req, res, next) => {
    const taskId =parseInt(req.params.taskId);
    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ msg: "Task Not Found" });
        }
        await task.destroy();
        res.json({ msg: "Task deleted Successfuly" });

        


    } catch (err) {
        console.error(`Error in deleting Task With Id ${taskId}`, err);
        next(err);
    }
}
