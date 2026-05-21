export interface Stone {
  id: string;
  name: string;
  alternativeName?: string;
  origin: string;
  colors: string[];
  texture: string;
  recommendedUses: string[];
  description: string;
  vibe: string;
  installationTip: string;
  weightPerM2: number; // kg per m2
  estimatedPriceIndicator: '●○○' | '●●○' | '●●●';
  imageUrl: string;
  galleryUrls?: string[];
}

export interface DirectQuoteQuery {
  stoneId: string;
  areaM2: number;
  useCase: 'pared' | 'piso';
  wasteFactor: boolean; // Add 10% waste buffer
  includesAdhesive: boolean;
}

export interface QuoteResult {
  stoneName: string;
  areaM2: number;
  totalWeightKg: number;
  palletsNeeded: number;
  adhesiveBags: number;
  recommendedJointSize: string;
  estimatedPriceRange: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
