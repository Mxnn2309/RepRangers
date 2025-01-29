const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI

const app = express();
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Middleware
app.use(express.json()); // Allows us to handle JSON data in the request body.
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next()
});

// Routes 
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);

// Connecting to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log( "MongoDB Connected!" );
        // Listening to the request
        app.listen(process.env.PORT,()=>{
            console.log('Server is running on http://localhost:' + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });