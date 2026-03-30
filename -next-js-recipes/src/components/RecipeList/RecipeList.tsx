'use client';

import RecipeCard from '../RecipeCard/RecipeCard';
//import styles from './RecipeList.module.css';

interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string;
  duration: number;
}

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
