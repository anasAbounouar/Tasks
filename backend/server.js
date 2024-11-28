const express = require("express")
const app = express();
const cors = require("cors");
const {sequelize, connectMongoDb, connectSequelize} = require("./config/db");
const path = require("path");
const fs = require('fs');
require('dotenv').config();
const PORT = process.env.PORT
// import routes

const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const attachmentRoutes = require('./routes/attachmentRoutes');

// import middleware
const errorHandler = require('./middleware/errorHandler');


// Middleware 
app.use(cors())
app.use(express.json()); // parse Json bodies

// Serve static files from 'upload' dir
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes

app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tasks/:taskId/comments', commentRoutes);
app.use('/api/tasks/:taskId/attachments', attachmentRoutes);

// Error handlling middleware (last as always)

app.use(errorHandler);

// Function to start server
const startServer = async () => {
     // Ensure the 'uploads' directory exists
    const uploadsDir = path.join(__dirname, "uploads");

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
        console.log('✅ "uploads" directory created');
      
    }
    try {
        // Connect to both databases
        await connectSequelize();  // First connect to MySQL
        await connectMongoDb();    // Then connect to MongoDB

        // Sync sequelize models after database connections are established 

        await sequelize.sync({ alter: true });
        console.log("✅ MySQL Synced Successfully");

        // start server
         
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
            
    }catch (err) {
        console.error("❌ Error during server startup:", err);
        process.exit(1); // Exit if any error occurs
      }

    
}

// start server funciton

startServer();