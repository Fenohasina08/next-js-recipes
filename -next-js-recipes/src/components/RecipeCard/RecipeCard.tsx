'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [pinned, setPinned] = useState(false);

  return (
    <article className={`border rounded-lg p-4 shadow-md ${pinned ? 'bg-yellow-100' : 'bg-white'}`}>
      <Link href={`/recettes/${recipe.id}`}>
        <div className="relative w-full h-48 mb-4 cursor-pointer">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover rounded"
          />
        </div>
        <h2 className="text-xl font-bold mt-2 hover:text-blue-600">{recipe.name}</h2>
      </Link>
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
