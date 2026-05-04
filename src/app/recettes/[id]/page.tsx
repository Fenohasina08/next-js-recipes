'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useRecipeStore } from '@/stores/recipeStore';

export default function RecipePage({ params }: { params: { id: string } }) {
  // Hydratation au montage
  useEffect(() => {
    useRecipeStore.persist.rehydrate();
  }, []);

  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => r.id === params.id)
  );
  const hasHydrated = useRecipeStore((s) => s._hasHydrated);

  // Pendant l'hydratation, on attend (évite le 404 prématuré)
  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Maintenant que l'hydratation est faite, on vérifie vraiment
  if (!recipe) {
    notFound();
  }

  // Suite de l'affichage (identique à avant)
  const hasIngredients = recipe.ingredients && recipe.ingredients.length > 0;
  const hasSteps = recipe.steps && recipe.steps.length > 0;

  return (
    <main className="min-h-screen bg-amber-50 px-4 pt-6">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
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
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Ingrédients */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-800 flex items-center gap-2 border-b border-amber-200 pb-2 mb-4">
              <span className="text-3xl">🥣</span> Ingredients
              {!hasIngredients && <span className="text-amber-500 text-xl ml-1">+</span>}
            </h2>
            {hasIngredients ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="min-h-[2rem] text-gray-400 italic" />
            )}
          </section>

          {/* Préparation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-800 flex items-center gap-2 border-b border-amber-200 pb-2 mb-4">
              <span className="text-3xl">👩‍🍳</span> Preparation
              {!hasSteps && <span className="text-amber-500 text-xl ml-1">+</span>}
            </h2>
            {hasSteps ? (
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
            ) : (
              <div className="min-h-[2rem] text-gray-400 italic" />
            )}
          </section>

          {/* Description (recettes utilisateur) */}
          {recipe.description && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-amber-800 flex items-center gap-2 border-b border-amber-200 pb-2 mb-4">
                <span className="text-3xl">📝</span> Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
            </section>
          )}

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