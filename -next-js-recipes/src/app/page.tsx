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

  const handleReverse = () => setRecipes([...recipes].reverse());

  const handleToggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const handleTogglePinned = (id: string) => {
    const newPinned = new Set(pinned);
    if (newPinned.has(id)) newPinned.delete(id);
    else newPinned.add(id);
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
      filtered = filtered.filter(recipe => favorites.has(recipe.id) && pinned.has(recipe.id));
    } else if (showFavorites) {
      filtered = filtered.filter(recipe => favorites.has(recipe.id));
    } else if (showPinned) {
      filtered = filtered.filter(recipe => pinned.has(recipe.id));
    }
    return filtered;
  }, [recipes, searchTerm, showFavorites, showPinned, favorites, pinned]);

  return (
    <>
      <Header onReverse={handleReverse} />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        showPinned={showPinned}
        onTogglePinned={() => setShowPinned(!showPinned)}
      />
      <div className='bg-amber-50'>
        <RecipeList
          recipes={filteredRecipes}
          favorites={favorites}
          pinned={pinned}
          onToggleFavorite={handleToggleFavorite}
          onTogglePinned={handleTogglePinned}
        />
      </div>
    </>
  );
}