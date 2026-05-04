export interface Recipe {
  id: string;
  name: string;
  image: string;            
  description?: string;    
  category?: string;        
  ingredients?: string[];   
  steps?: string[];         
  duration?: number;        
}