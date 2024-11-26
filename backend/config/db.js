
const { Sequelize } = require("sequelize");

const mongoose = require("mongoose");

require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, // database name 
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        PORT: process.env.DB_PORT || 5432,
    }
)

// test the sql  connection

sequelize.authenticate().then(() => {
    console.log('✅ SQL DB Connected...');
}).catch(err => console.err('❌ MySQL Connection Error:' + err));

// Connect to mongoose
try {
    await mongoose.connect(process.env.MONGO_URI)
     console.log('✅ MongoDB Connected...')
} catch (err) {
    console.error('MongoDB Connection Error '+ err )
    
}
module.exports = sequelize;