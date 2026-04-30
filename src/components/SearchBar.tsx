'use client';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
  showPinned: boolean;
  onTogglePinned: () => void;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  showFavorites,
  onToggleFavorites,
  showPinned,
  onTogglePinned,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 bg-white shadow-md">
      <input
        type="text"
        placeholder="🔍 Rechercher une recette..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full text-black md:w-1/2 px-5 py-3 border border-gray-300 rounded-xl shadow-sm"
      />
      <button
        onClick={onTogglePinned}
        className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
          showPinned ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {showPinned ? '📌 Épinglés' : '📌 Pin'}
      </button>
      <button
        onClick={onToggleFavorites}
        className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
          showFavorites ? "bg-amber-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {showFavorites ? '⭐ Favoris' : '☆ Favoris'}
      </button>
    </div>
  );
}