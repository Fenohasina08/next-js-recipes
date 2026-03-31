'use client';

import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string;
  duration: number;
}

interface RecipeListProps {
  recipes: Recipe[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;  // ← déclaration explicite
}

export default function RecipeList({ recipes, favorites, onToggleFavorite }: RecipeListProps) {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard
            recipe={recipe}
            isFavorite={favorites.has(recipe.id)}
            onToggleFavorite={onToggleFavorite}   
          />
        </li>
      ))}
    </ul>
  );
}