export interface Recipe {
  id: number;
  name: string;
  image: string;
  category: string;
  duration: number;
  description?: string;
}