'use client';

interface HeaderProps {
  onReverse: () => void;
}

export default function Header({ onReverse }: HeaderProps) {
  return (
   <header className="flex items-center justify-center h-[8vh] bg-amber-50 text-black">
  <p className="text-center">Recipe book</p>
</header>
  );
}