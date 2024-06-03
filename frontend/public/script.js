async function searchRecipes() {
    const ingredientInput = document.getElementById('ingredientInput').value;
    const ingredients = ingredientInput.split(',').map(ingredient => ingredient.trim()).join(',');

    try {
        const response = await fetch(`/recipes?ingredients=${ingredients}`);
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipeResults = document.getElementById('recipeResults');
    recipeResults.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
        `;
        recipeResults.appendChild(recipeElement);
    });
}

document.getElementById('searchButton').addEventListener('click', searchRecipes);