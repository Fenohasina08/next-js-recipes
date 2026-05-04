'use client';

import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';
import type { Recipe } from '@/types/recipe'; // ← Utilise le type partagé

interface RecipeListProps {
  recipes: Recipe[];
  favorites: string[];
  pinned: string[];
  onToggleFavorite: (id: string) => void;
  onTogglePinned: (id: string) => void;
}

export default function RecipeList({
  recipes,
  favorites,
  pinned,
  onToggleFavorite,
  onTogglePinned,
}: RecipeListProps) {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard
            recipe={recipe}
            isFavorite={favorites.includes(recipe.id)}
            isPinned={pinned.includes(recipe.id)}
            onToggleFavorite={onToggleFavorite}
            onTogglePinned={onTogglePinned}
          />
        </li>
      ))}
    </ul>
  );
}