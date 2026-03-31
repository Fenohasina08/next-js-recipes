'use client';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

export default function SearchBar({ searchTerm, onSearchChange, showFavorites, onToggleFavorites }: SearchBarProps) {
  return (
    <div className="search-bar">
        <input
        type="text"
        placeholder="Rechercher une recette..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      <button onClick={onToggleFavorites} className={`favorites-btn ${showFavorites ? 'active' : ''}`}>
        {showFavorites ? '⭐ Favoris' : '☆ Favoris'}
      </button>
    </div>
  );
}
 