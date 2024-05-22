document.getElementById('search-button').addEventListener('click', function() {
    const ingredients = document.getElementById('ingredient-input').value;
    fetchRecipes(ingredients);
});

async function fetchRecipes(ingredients) {
    try {
        const response = await fetch('/api/recipes/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        });
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayResults(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.ingredients.map(ing => ing.name).join(', ')}</p>`;
        resultsDiv.appendChild(recipeDiv);
    });
}
document.getElementById('search-button').addEventListener('click', function() {
    const ingredients = document.getElementById('ingredient-input').value;
    fetchRecipes(ingredients);
});

async function fetchRecipes(ingredients) {
    try {
        const response = await fetch('/api/recipes/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        });
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayResults(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.ingredients.map(ing => ing.name).join(', ')}</p>`;
        resultsDiv.appendChild(recipeDiv);
    });
}
