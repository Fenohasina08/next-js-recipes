export interface Recipe {
  id: string;
  name: string;
  image: string;            // Toujours obligatoire (on fournit une valeur par défaut)
  description?: string;     // ✅ Nouveau – pour les recettes utilisateur
  category?: string;        // Optionnel
  ingredients?: string[];   // Optionnel
  steps?: string[];         // Optionnel
  duration?: number;        // Optionnel
}