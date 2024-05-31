const express = require('express');

// Change require() to import() for importing node-fetch
import('node-fetch').then(fetch => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.static('frontend'));

    app.get('/recipes', async (req, res) => {
        try {
            const ingredients = req.query.ingredients;
            const apiKey = 'd35b9c8605944ae6a82e8d41931c46e6'; // Spoonacular API key
            const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`);
            const data = await response.json();
            res.json({ results: data });
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'Error fetching recipes' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error importing node-fetch:', error);
});
