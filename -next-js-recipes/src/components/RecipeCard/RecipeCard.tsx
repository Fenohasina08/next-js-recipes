'use client';

import { useState } from 'react';
import type { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [pinned, setPinned] = useState(false);

  return (
    <article className={`border rounded-lg p-4 shadow-md ${pinned ? 'bg-yellow-100' : 'bg-white'}`}>
      <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{recipe.name}</h2>
      <span className="inline-block bg-gray-200 px-2 py-1 text-sm rounded mt-1">{recipe.category}</span>
      <p className="text-gray-600 mt-1">{recipe.duration} min</p>
      <button
        onClick={() => setPinned(!pinned)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {pinned ? 'Unpin' : 'Pin'}
      </button>
    </article>
  );
}
