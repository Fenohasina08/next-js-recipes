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
        className="search-input"
      />
      <button onClick={onToggleFavorites} className={`favorites-btn ${showFavorites ? 'active' : ''}`}>
        {showFavorites ? '⭐ Favoris' : '☆ Favoris'}
      </button>
    </div>
  );
}
 