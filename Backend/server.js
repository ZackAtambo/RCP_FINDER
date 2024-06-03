
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes'); // Import the recipeRoutes

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; // Use the PORT environment variable or default to 3001

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use recipeRoutes middleware
app.use('/api', recipeRoutes);

// Serve static files (frontend)
app.use(express.static('../frontend'));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
