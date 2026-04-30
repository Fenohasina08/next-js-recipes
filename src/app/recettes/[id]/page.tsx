import recipes from '@/data/recipes.json';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = recipes.find(r => r.id === params.id);

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

      <h2 className="text-2xl font-semibold mt-6 mb-2">Ingrédients</h2>
      <ul className="list-disc pl-5 mb-6">
        {recipe.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Étapes</h2>
      <ol className="list-decimal pl-5">
        {recipe.steps.map((step, idx) => (
          <li key={idx} className="mb-2">{step}</li>
        ))}
      </ol>
    </div>
  );
}
