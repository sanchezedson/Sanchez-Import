export interface OlfactoryPyramid {
  top: string[];     // Notas de Saída / Topo
  heart: string[];   // Notas de Coração / Corpo
  base: string[];    // Notas de Fundo / Fixação
}

export interface PerfumeProduct {
  id: string;
  name: string;
  house: string;
  origin: string;
  volume: string;
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Eau de Toilette';
  price: number;
  originalPrice: number;
  installments: {
    count: number;
    value: number;
  };
  rating: number;
  reviewsCount: number;
  family: 'Âmbar & Oriental' | 'Amadeirado Nobre' | 'Cítrico & Fresco' | 'Floral Especiado' | 'Gourmand' | 'Couro & Aromático';
  personality: 'Marcante & Sedutor' | 'Sofisticado & Elegante' | 'Fresco & Energético' | 'Romântico & Envolvente' | 'Misterioso & Noturno';
  image: string;
  secondaryImage?: string;
  badge?: string;
  stockLeft: number;
  projection: 'Alta (2-3 metros)' | 'Moderada marcante (1-2 metros)' | 'Intimista elegante';
  longevity: '12h+' | '8h a 10h' | '6h a 8h';
  occasion: string;
  description: string;
  pyramid: OlfactoryPyramid;
  dominantNotes: string[];
  batchCodeExample: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  verified: boolean;
  rating: number;
  perfumeName: string;
  title: string;
  comment: string;
  date: string;
  complimentsReceived: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  image: string;
  content: string[];
  keyTips: string[];
}

export interface CartItem {
  product: PerfumeProduct;
  quantity: number;
  engravingText?: string;
}

export interface Coupon {
  code: string;
  discountPercentage?: number;
  discountFixed?: number;
  minOrderValue?: number;
  description: string;
}

export interface PersonalityAnswer {
  vibe: string;
  occasion: string;
  intensity: string;
}

export interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
}
