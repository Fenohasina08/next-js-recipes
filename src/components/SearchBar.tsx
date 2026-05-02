'use client';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="🔍 Rechercher une recette..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full text-black px-5 py-3 border border-gray-300 rounded-xl shadow-sm"
      />
    </div>
  );
}