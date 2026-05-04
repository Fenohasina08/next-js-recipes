'use client';

import { useState, useMemo } from 'react';
import RecipeList from '@/components/RecipeList/RecipeList';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import recipesData from '@/data/recipes.json';
import type { Recipe } from '@/types/recipe';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(recipesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [pinned, setPinned] = useState<Set<string>>(new Set());

  // 🔥 NEW STATES (MODAL + FORM)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    image: '',
    description: '',
  });

  // 🔹 Ouvrir le modal
  const handleAdd = () => {
    setIsModalOpen(true);
  };

  // 🔹 Gestion input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipeToAdd: Recipe = {
      id: Date.now().toString(),
      name: newRecipe.name,
      image: newRecipe.image || '/images/default.jpg',
      description: newRecipe.description,
    };

    setRecipes([recipeToAdd, ...recipes]);

    // reset
    setNewRecipe({
      name: '',
      image: '',
      description: '',
    });

    setIsModalOpen(false);
  };

  // 🔹 Inverser l'ordre
  const handleReverse = () => {
    setRecipes([...recipes].reverse());
  };

  // 🔹 Favoris
  const handleToggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
  };

  // 🔹 Pin
  const handleTogglePinned = (id: string) => {
    const newPinned = new Set(pinned);
    if (newPinned.has(id)) newPinned.delete(id);
    else newPinned.add(id);
    setPinned(newPinned);
  };

  // 🔹 Filtrage
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (searchTerm.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showFavorites && showPinned) {
      filtered = filtered.filter(
        recipe => favorites.has(recipe.id) && pinned.has(recipe.id)
      );
    } else if (showFavorites) {
      filtered = filtered.filter(recipe => favorites.has(recipe.id));
    } else if (showPinned) {
      filtered = filtered.filter(recipe => pinned.has(recipe.id));
    }

    return filtered;
  }, [recipes, searchTerm, showFavorites, showPinned, favorites, pinned]);

  return (
    <>
      {/* HEADER FIXE */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-amber-50">
        <Header />

        <div className="flex flex-col items-center justify-center gap-6 py-6">
          
          {/* 🔹 BOUTONS */}
          <div className="flex flex-wrap gap-4 justify-center">

            {/* ADD BUTTON */}
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-green-600 transition"
            >
              ➕ Add
            </button>

            {/* PIN */}
            <button
              onClick={() => setShowPinned(!showPinned)}
              className={`px-5 py-2 rounded-lg font-medium shadow-md transition 
                ${showPinned 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              📌 {showPinned ? 'Pinned' : 'Pin'}
            </button>

            {/* FAVORITES */}
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-5 py-2 rounded-lg font-medium shadow-md transition 
                ${showFavorites 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              ⭐ Favorites
            </button>

            {/* REVERSE */}
            <button
              onClick={handleReverse}
              className="bg-amber-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-amber-600 transition"
            >
              Reverse order
            </button>

          </div>

          {/* 🔹 SEARCH */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>

      {/* CONTENU */}
      <div className="pt-[220px] bg-amber-50 pb-15">
        <RecipeList
          recipes={filteredRecipes}
          favorites={favorites}
          pinned={pinned}
          onToggleFavorite={handleToggleFavorite}
          onTogglePinned={handleTogglePinned}
        />
      </div>

      {/* 🔥 MODAL */}
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

              {/* ACTIONS */}
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