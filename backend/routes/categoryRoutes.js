

const categoryController = require("../controllers/categoryController");
const express= require("express")
const router = express.Router();


// @route  GET /api/categories
// @desc  get all categories
// @access public

router.get("/", categoryController.getAllCategories);


// @route  Post  /api/categories
// @desc  create  category
// @access public
router.post("/", categoryController.createCategory);

// @route  Delete /api/categories/:categoryId
// @desc  delete category by categoryId
// @access public

router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;

