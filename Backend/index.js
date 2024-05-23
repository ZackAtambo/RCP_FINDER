const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = 'd35b9c8605944ae6a82e8d41931c46e6'; // Updated Spoonacular API Key

// Middleware
app.use(express.json());

// Routes
app.get('/api/recipes', async (req, res) => {
    const { ingredients } = req.query;

    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: {
                ingredients,
                apiKey: API_KEY,
                number: 10 // Limiting to 10 recipes for simplicity
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
