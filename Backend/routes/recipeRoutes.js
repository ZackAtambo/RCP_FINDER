const express = require('express');
const router = express.Router(); // Define the router object
let fetch;
try {
    fetch = require('node-fetch');
} catch (error) {
    fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
}
const Recipe = require('../models/Recipe');
require('dotenv').config();

const apiKey = process.env.SPOONACULAR_API_KEY;

router.get('/recipes', async (req, res) => {
    const ingredients = req.query.ingredients;

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`);
        const data = await response.json();

        console.log('Data from API:', data); // Add this line to inspect the data
        
        // Save recipes to the database
        data.forEach(async recipeData => {
            const recipe = new Recipe({
                title: recipeData.title,
                image: recipeData.image,
                readyInMinutes: recipeData.readyInMinutes,
                ingredients: recipeData.missedIngredients.map(ingredient => ingredient.name)
            });
            await recipe.save();
        });

        res.json(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'An error occurred while fetching recipes.' });
    }
});

module.exports = router; // Export the router object
