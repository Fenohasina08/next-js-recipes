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
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleReverse = () => {
    setRecipes([...recipes].reverse());
  };

  const handleToggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;
    // Filtre par recherche
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Filtre favoris si activé
    if (showFavorites) {
      filtered = filtered.filter(recipe => favorites.has(recipe.id));
    }
    return filtered;
  }, [recipes, searchTerm, showFavorites, favorites]);

  return (
    <>
      <Header onReverse={handleReverse} />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
      />
      <div className='bg-amber-50'>
          <RecipeList
        recipes={filteredRecipes}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
      </div>
    
    </>
  );
}