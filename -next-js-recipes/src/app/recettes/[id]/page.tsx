import recipes from './recip.json';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = recipes.find(r => r.id?.toString() === params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <div className="relative w-full h-64 mb-4">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <p className="text-gray-600 mb-2">Catégorie : {recipe.category}</p>
      <p className="text-gray-600 mb-4">Durée : {recipe.duration} min</p>
      <p className="text-gray-800">{recipe.description}</p>
    </div>
  );
}