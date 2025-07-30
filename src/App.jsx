import React, { useState } from 'react';
import RecipeCard from './components/RecipeCard.jsx';
import './App.css';


const categories = ["Breakfast", "Dessert", "Side", "Starter", "Miscellaneous", "Seafood", "Pasta", "Vegetarian"];

const App = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");

  const getRecipe = async () => {
    setLoading(true);

    // Fetch meals in selected category
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
    const data = await res.json();

    // Pick random meal
    const meals = data.meals;
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];

    // Get full details
    const detailRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`);
    const detailData = await detailRes.json();
    const meal = detailData.meals[0];

    // Simplify recipe
    const recipeData = {
      name: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory
    };

    setRecipe(recipeData);
    setLoading(false);
  };

  return (
    <div>
      <h1>What should I eat?</h1>

      <div className="category-buttons">
        {categories.map((c) => (
      <button
      key={c}
      className={`category-btn ${selectedCategory === c ? 'active' : ''}`}
      onClick={() => setSelectedCategory(c)}
      >
      {c}
    </button>
  ))}
</div>


      <br />

      <button 
        onClick={getRecipe}
        style={{ padding: '10px 20px', fontSize: '18px', margin: '20px'}}
      >
        Tell me!
      </button>

      {loading && <p>Loading...</p>}
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  );
};

export default App;
