'use client';

import React from 'react';
import Link from 'next/link';
import { BedDouble, Bath, Square, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { formatCLP, formatUF } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isVenta = property.operation === 'venta';
  
  // Format price display
  const priceDisplay = isVenta 
    ? (property.priceUF ? formatUF(property.priceUF) : formatCLP(property.priceCLP))
    : formatCLP(property.priceCLP);
    
  const secondaryPriceDisplay = isVenta && property.priceUF && property.priceCLP
    ? formatCLP(property.priceCLP)
    : null;

  return (
    <div className="group premium-panel overflow-hidden rounded-[1.35rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#102a2a]">
        <img
          src={property.mainImage || '/images/placeholder.jpg'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // fallback if image fails to load
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102a2a]/70 via-transparent to-[#102a2a]/15" />

        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] shadow-sm ${
            isVenta 
              ? 'bg-[#b77946] text-white' 
              : 'bg-[#0f3d3e] text-white'
          }`}>
            {isVenta ? 'Venta' : 'Arriendo'}
          </span>
        </div>

        {property.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#f7f0e6]/92 text-[#17201f] backdrop-blur-sm shadow-sm">
              Selección Altavista
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8c7a3]">{property.type}</p>
            <p className="mt-1 flex items-center text-sm font-medium text-white">
              <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-[#c89b3c]" />
              <span className="truncate">{property.comuna}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif font-bold text-xl text-[#17201f] group-hover:text-[#0f3d3e] transition-colors line-clamp-2 mb-4 leading-snug">
          {property.title}
        </h3>

        <div className="mb-4">
          <p className="text-2xl font-bold text-[#0f3d3e] font-sans">
            {priceDisplay}
          </p>
          {secondaryPriceDisplay && (
            <p className="text-xs text-[#5f6b65] font-light mt-0.5">
              Ref: {secondaryPriceDisplay}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#b8aa94]/30 text-[#5f6b65] text-xs font-medium mb-5 mt-auto">
          <div className="flex items-center justify-center space-x-1.5 py-1 min-w-0">
            <BedDouble className="w-4 h-4 text-[#8a9a87] flex-shrink-0" />
            <span>{property.bedrooms} Dorms</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 py-1 min-w-0">
            <Bath className="w-4 h-4 text-[#8a9a87] flex-shrink-0" />
            <span>{property.bathrooms} Baños</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 py-1 min-w-0">
            <Square className="w-4 h-4 text-[#8a9a87] flex-shrink-0" />
            <span>{property.areaConstruida || property.areaTerreno} m²</span>
          </div>
        </div>

        <Link
          href={`/propiedades/${property.slug}`}
          className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold border border-[#0f3d3e]/20 text-[#0f3d3e] bg-[#f4efe6]/70 hover:bg-[#0f3d3e] hover:text-white transition-all duration-200"
        >
          Ver propiedad
        </Link>
      </div>
    </div>
  );
}
