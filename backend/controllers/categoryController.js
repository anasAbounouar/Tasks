
const Category =require("../models/Category")
// exports.XX = async (req, res, next) => {
//     try {

//     } catch (err) {
//         console.error("......", err);
//         next(err);
//     }
// }

// create a new Category 
exports.createCategory = async (req, res, next) => {
    const {name}= req.body
    try {
        // Check if category already exists 
        const existingCategory = await Category.findOne({ where: { name } })
        if (existingCategory) {
            return res.status(400).json({ msg: 'Category already exists' });
        }
        
        // create category 
        const category = await Category.create({ name });
        res.status(201).json(category);


    } catch (err) {
        console.error('Error creating category:', err);
        next(err);
    }
}

// Retrive all categories

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            order: [['name', 'ASC']] // Order categories alphabetically
        });
        res.json(categories);

    } catch (err) {
        console.error('Error fetching categories:', err);
        next(err);
    }
}

// Delete category by id 
exports.deleteCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findByPk(categoryId)
        if (!category) {
            return res.status(404).json({ msg: "Category Not Found" });
        }
        await category.destroy();
        res.json({ msg: "Category deleted Successfuly" });
        
        

    } catch (err) {
        console.error(`Error deleting category with ID ${categoryId}:`, err);
        next(err);
    }
}


