function searchRecipes() {
    const ingredientInput = document.getElementById('ingredientInput').value;
    fetch(`/recipes?ingredients=${ingredientInput}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.results);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
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
