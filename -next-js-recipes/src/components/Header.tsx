'use client';

interface HeaderProps {
  onReverse: () => void;
}

export default function Header({ onReverse }: HeaderProps) {
  return (
    <header className="header">
      <h1>Recipe book</h1>
      <button className="reverse-btn" onClick={onReverse}>
        Reverse order
      </button>
    </header>
  );
}