'use client';

import Link from 'next/link';
import styles from './RecipeCard.module.css';

interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string;
  duration: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  isPinned: boolean;
  onToggleFavorite: (id: string) => void;
  onTogglePinned: (id: string) => void;
}

export default function RecipeCard({
  recipe,
  isFavorite,
  isPinned,
  onToggleFavorite,
  onTogglePinned,
}: RecipeCardProps) {
  return (
    <article className={`${styles.card} ${isPinned ? styles.pinned : ''}`}>
      <Link href={`/recettes/${recipe.id}`}>
        <img className={styles.image} src={recipe.image} alt="" />
      </Link>
      <div className={styles.body}>
        <Link href={`/recettes/${recipe.id}`}>
          <h2 className={styles.name}>{recipe.name}</h2>
        </Link>
        <span className={styles.badge}>{recipe.category}</span>
        <p className={styles.duration}>{recipe.duration} min</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.pin}
            onClick={() => onTogglePinned(recipe.id)}
          >
            {isPinned ? 'Unpin' : 'Pin'}
          </button>
          <button
            type="button"
            className={`${styles.favorite} ${isFavorite ? styles.active : ''}`}
            onClick={() => onToggleFavorite(recipe.id)}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
      </div>
    </article>
  );
}