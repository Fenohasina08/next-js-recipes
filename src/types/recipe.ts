export interface Recipe {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  steps: string[];
  duration: number;
  image: string;
}
