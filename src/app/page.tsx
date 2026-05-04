'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import RecipeList from '@/components/RecipeList/RecipeList';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import type { Recipe } from '@/types/recipe';
import { useRecipeStore } from '@/stores/recipeStore';

export default function Home() {
  // === Hydratation du store Zustand (côté client uniquement) ===
  useEffect(() => {
    useRecipeStore.persist.rehydrate();
  }, []);

  // Lecture des états globaux
  const recipes = useRecipeStore((s) => s.recipes);
  const favorites = useRecipeStore((s) => s.favorites);
  const pinned = useRecipeStore((s) => s.pinned);
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const reverseRecipes = useRecipeStore((s) => s.reverseRecipes);
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);
  const togglePinned = useRecipeStore((s) => s.togglePinned);

  // État local (transitoire)
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    image: '',
    description: '',
  });

  // === Ajout d’une recette ===
  const handleAdd = useCallback(() => setIsModalOpen(true), []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewRecipe((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const recipeToAdd: Recipe = {
        id: Date.now().toString(),
        name: newRecipe.name,
        image: newRecipe.image || '/images/default.jpg',
        description: newRecipe.description,
      };

      addRecipe(recipeToAdd);

      setNewRecipe({ name: '', image: '', description: '' });
      setIsModalOpen(false);
      setSearchTerm(''); // pour afficher la nouvelle recette immédiatement
    },
    [newRecipe, addRecipe]
  );

  // === Filtrage optimisé ===
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(term)
      );
    }

    if (showFavorites && showPinned) {
      filtered = filtered.filter(
        (r) => favorites.includes(r.id) && pinned.includes(r.id)
      );
    } else if (showFavorites) {
      filtered = filtered.filter((r) => favorites.includes(r.id));
    } else if (showPinned) {
      filtered = filtered.filter((r) => pinned.includes(r.id));
    }

    return filtered;
  }, [recipes, searchTerm, showFavorites, showPinned, favorites, pinned]);

  // === Rendu ===
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] bg-amber-50">
        <Header />

        <div className="flex flex-col items-center justify-center gap-6 py-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-green-600 transition"
            >
              ➕ Add
            </button>

            <button
              onClick={() => setShowPinned(!showPinned)}
              className={`px-5 py-2 rounded-lg font-medium shadow-md transition ${
                showPinned
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              📌 {showPinned ? 'Pinned' : 'Pin'}
            </button>

            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-5 py-2 rounded-lg font-medium shadow-md transition ${
                showFavorites
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              ⭐ Favorites
            </button>

            <button
              onClick={reverseRecipes}
              className="bg-amber-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-amber-600 transition"
            >
              Reverse order
            </button>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>

      <div className="pt-[220px] bg-amber-50 pb-15">
        <RecipeList
          recipes={filteredRecipes}
          favorites={favorites}
          pinned={pinned}
          onToggleFavorite={toggleFavorite}
          onTogglePinned={togglePinned}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Recipe</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Recipe name"
                value={newRecipe.name}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newRecipe.image}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newRecipe.description}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}