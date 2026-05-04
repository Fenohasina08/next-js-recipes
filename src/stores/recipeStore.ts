import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Recipe } from '@/types/recipe';
import recipesData from '@/data/recipes.json';

interface RecipeStore {
  recipes: Recipe[];
  favorites: string[];
  pinned: string[];
  _hasHydrated: boolean; // 👈 indique que l'hydratation est terminée

  addRecipe: (recipe: Recipe) => void;
  reverseRecipes: () => void;
  toggleFavorite: (id: string) => void;
  togglePinned: (id: string) => void;
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set) => ({
      recipes: recipesData,
      favorites: [],
      pinned: [],
      _hasHydrated: false,

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
      name: 'recipe-app-storage',
      skipHydration: true,
      // Appelée quand l'hydratation est terminée
      onRehydrateStorage: () => (state) => {
        state._hasHydrated = true;
      },
    }
  )
);