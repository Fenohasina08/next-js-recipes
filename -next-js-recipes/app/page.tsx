import RecipeList from '@/components/RecipeList/RecipeList';
import recipes from '@/data/recipes.json';

export default function HomePage() {
  return <RecipeList recipes={recipes} />;
}