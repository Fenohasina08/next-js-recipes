'use client';

interface HeaderProps {
  onReverse: () => void;
}

export default function Header({ onReverse }: HeaderProps) {
  return (
    <header className="header flex items-center justify-between h-[8vh] bg-amber-50 text-black">
        <h1>Recipe book</h1>
            <button
            className="reverse-btn bg-amber-500 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-amber-600 transition"
            onClick={onReverse}
            >                
            Reverse order
            </button>
    </header>
  );
}