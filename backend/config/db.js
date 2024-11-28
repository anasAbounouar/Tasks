const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;


// sequelize setup 
const sequelize = new Sequelize(
  process.env.DB_NAME, // database name
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT ,
    port: DB_PORT  || 5432,
  }
);

// Connect to SQL   (sequelize)
const connectSequelize = async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log("✅ SQL DB Connected...");
    } catch (err) {
        console.error("❌ SQL Connection Error:", err);
        process.exit(1); // Exit if the connection fails

    }

    
}

// Connect to NOSQL mongoodb (Mongoose)

const connectMongoDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Exit if the connection fails
    }
}

module.exports = {
    sequelize, connectMongoDb, connectSequelize
}


