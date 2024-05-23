// Function to send a request to the backend and fetch recipes based on user input
const searchRecipes = async () => {
    const ingredientInput = document.getElementById('ingredientInput').value.trim();

    // If input is empty, do nothing
    if (!ingredientInput) return;

    try {
        const response = await fetch(`/api/recipes?ingredients=${ingredientInput}`);
        const data = await response.json();

        displayRecipes(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};

// Function to display recipes on the page
const displayRecipes = (recipes) => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title;

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.title;

        recipeDiv.appendChild(recipeImage);
        recipeDiv.appendChild(recipeTitle);

        resultsDiv.appendChild(recipeDiv);
    });
};
