import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const isVeg = recipe.category === "Vegetarian";

  return (
    <div className="recipe-card">
      <h2>{recipe.name}</h2>
      <img 
        src={recipe.image} 
        alt={recipe.name}  
      />
      <p>
        {isVeg ? 
          <span style={{color: 'green'}}>🌱 Vegetarian</span> 
          : <span style={{color: 'red'}}>🍗 Non-Veg</span>
        }
      </p>
    </div>
  );
};

export default RecipeCard;
