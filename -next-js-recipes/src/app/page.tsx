'use client';

import { useState } from 'react';
import RecipeList from '@/components/RecipeList/RecipeList';
import Header from '@/components/Header';
import recipesData from '@/data/recipes.json';
import type { Recipe } from '@/types/recipe';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(recipesData);

  const handleReverse = () => {
    setRecipes([...recipes].reverse());
  };

  return (
    <>
      <Header onReverse={handleReverse} />
      <RecipeList recipes={recipes} />
    </>
  );
}
