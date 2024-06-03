const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    readyInMinutes: Number,
    ingredients: [String],
});

module.exports = mongoose.model('Recipe', recipeSchema);