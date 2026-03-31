'use client';

interface HeaderProps {
  onReverse: () => void;
}

export default function Header({ onReverse }: HeaderProps) {
  return (
    <header className="header flex items-center justify-between h-[8vh] bg-amber-50 text-black">
        <h1>Recipe book</h1>
            <button className="reverse-btn" onClick={onReverse}>
                Reverse order
            </button>
    </header>
  );
}