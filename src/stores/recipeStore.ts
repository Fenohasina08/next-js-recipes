import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Recipe } from '@/types/recipe';
import recipesData from '@/data/recipes.json';

interface RecipeStore {
  recipes: Recipe[];
  favorites: string[];
  pinned: string[];

  // Actions
  addRecipe: (recipe: Recipe) => void;
  reverseRecipes: () => void;
  toggleFavorite: (id: string) => void;
  togglePinned: (id: string) => void;
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set) => ({
      // État initial = les données du fichier JSON
      recipes: recipesData,
      favorites: [],
      pinned: [],

      addRecipe: (recipe) =>
        set((state) => ({ recipes: [recipe, ...state.recipes] })),

      reverseRecipes: () =>
        set((state) => ({ recipes: [...state.recipes].reverse() })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fid) => fid !== id)
            : [...state.favorites, id],
        })),

      togglePinned: (id) =>
        set((state) => ({
          pinned: state.pinned.includes(id)
            ? state.pinned.filter((pid) => pid !== id)
            : [...state.pinned, id],
        })),
    }),
    {
      name: 'recipe-app-storage', // clé dans localStorage
      skipHydration: true, // pour éviter le mismatch SSR
    }
  )
);