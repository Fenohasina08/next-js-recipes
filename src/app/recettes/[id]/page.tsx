import recipes from '@/data/recipes.json';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = recipes.find(r => r.id === params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-amber-50  px-4 fixed top-0 left-0 w-full z-[100]">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* En-tête avec l'image et les infos principales */}
        <div className="relative h-72 w-full md:h-96">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              {recipe.name}
            </h1>
            <div className="flex gap-4 text-sm">
              <span className="bg-amber-600/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                📂 {recipe.category}
              </span>
              <span className="bg-amber-600/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                ⏱️ {recipe.duration} min
              </span>
            </div>
          </div>
        </div>

        {/* Corps de la recette */}
        <div className="p-6 md:p-8">
          {/* Ingrédients */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-800 flex items-center gap-2 border-b border-amber-200 pb-2 mb-4">
              <span className="text-3xl">🥣</span> Ingrédients
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Étapes */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 flex items-center gap-2 border-b border-amber-200 pb-2 mb-4">
              <span className="text-3xl">👩‍🍳</span> Préparation
            </h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Bouton retour */}
          <div className="mt-10 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg"
            >
              ← Return Back
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}