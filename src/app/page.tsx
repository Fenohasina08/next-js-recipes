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

  const handleReverse = () => {
    setRecipes(prev => [...prev].reverse());
  };

  const handleToggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const handleTogglePinned = (id: string) => {
    const newPinned = new Set(pinned);
    newPinned.has(id) ? newPinned.delete(id) : newPinned.add(id);
    setPinned(newPinned);
  };

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (searchTerm.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showFavorites && showPinned) {
      filtered = filtered.filter(r => favorites.has(r.id) && pinned.has(r.id));
    } else if (showFavorites) {
      filtered = filtered.filter(r => favorites.has(r.id));
    } else if (showPinned) {
      filtered = filtered.filter(r => pinned.has(r.id));
    }

    return filtered;
  }, [recipes, searchTerm, showFavorites, showPinned, favorites, pinned]);

  return (
    <>
      <Header />

      {/* CONTENEUR CENTRAL */}
      <div className="flex flex-col items-center gap-4 py-6 bg-amber-50">

        {/* BOUTONS */}
        <div className="flex gap-4">

          <button
            onClick={() => setShowPinned(!showPinned)}
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition 
            ${showPinned ? 'bg-yellow-400' : 'bg-white'}`}
          >
            Pinned
          </button>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition 
            ${showFavorites ? 'bg-yellow-400' : 'bg-white'}`}
          >
            Favorites
          </button>

          <button
            onClick={handleReverse}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-amber-600 transition"
          >
            Reverse order
          </button>

        </div>

        {/* SEARCH */}
        <div className="w-full max-w-xl">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

      </div>

      {/* LISTE */}
      <RecipeList
        recipes={filteredRecipes}
        favorites={favorites}
        pinned={pinned}
        onToggleFavorite={handleToggleFavorite}
        onTogglePinned={handleTogglePinned}
      />
    </>
  );
}