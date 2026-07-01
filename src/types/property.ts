export interface Property {
  id: string;
  slug: string;
  title: string;
  operation: 'venta' | 'arriendo';
  type: 'casa' | 'departamento' | 'oficina' | 'terreno' | 'local' | 'industrial';
  status: 'borrador' | 'disponible' | 'reservada' | 'vendida' | 'arrendada' | 'pausada' | 'archivada';
  priceCLP: number;
  priceUF: number;
  bedrooms: number;
  bathrooms: number;
  areaConstruida: number; // sqm
  areaTerreno: number; // sqm
  address: string;
  comuna: string;
  region: string;
  description: string;
  mainImage: string;
  images: string[];
  isFeatured: boolean;
  isPublished: boolean;
  agentName: string;
  createdAt: string;
}

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  propertySlug: string;
  message?: string;
}
