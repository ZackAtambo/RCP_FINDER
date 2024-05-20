const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();  // Add this line to load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;  // Use the API key from the environment variable
const SPOONACULAR_API_URL = 'https://api.spoonacular.com/recipes';

app.post('/api/recipes/search', async (req, res) => {
    const { ingredients } = req.body;
    try {
        const response = await axios.get(`${SPOONACULAR_API_URL}/findByIngredients`, {
            params: {
                ingredients,
                apiKey: SPOONACULAR_API_KEY,
                number: 10
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes', details: error.message });
    }
});

app.get('/api/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${SPOONACULAR_API_URL}/${id}/information`, {
            params: {
                apiKey: SPOONACULAR_API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        res.status(500).json({ error: 'Failed to fetch recipe details', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
