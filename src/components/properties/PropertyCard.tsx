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
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.mainImage || '/images/placeholder.jpg'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // fallback if image fails to load
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Operation Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm ${
            isVenta 
              ? 'bg-amber-500 text-white' 
              : 'bg-teal-700 text-white'
          }`}>
            {isVenta ? 'Venta' : 'Arriendo'}
          </span>
        </div>

        {/* Featured Badge */}
        {property.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-800 backdrop-blur-sm shadow-sm">
              ★ Destacada
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Type & Comuna */}
        <div className="flex items-center text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
          <span>{property.type}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-0.5" />
            {property.comuna}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1 mb-3">
          {property.title}
        </h3>

        {/* Prices */}
        <div className="mb-4">
          <p className="text-xl font-bold text-teal-900 font-sans">
            {priceDisplay}
          </p>
          {secondaryPriceDisplay && (
            <p className="text-xs text-slate-400 font-light mt-0.5">
              Ref: {secondaryPriceDisplay}
            </p>
          )}
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-50 text-slate-500 text-xs font-medium mb-5 mt-auto">
          <div className="flex items-center justify-center space-x-1.5 py-1">
            <BedDouble className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>{property.bedrooms} Dorms</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 py-1">
            <Bath className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>{property.bathrooms} Baños</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 py-1">
            <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>{property.areaConstruida || property.areaTerreno} m²</span>
          </div>
        </div>

        {/* Details CTA Button */}
        <Link
          href={`/propiedades/${property.slug}`}
          className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold border border-teal-800/20 text-teal-800 bg-teal-50/50 hover:bg-teal-800 hover:text-white transition-all duration-200"
        >
          Ver propiedad
        </Link>
      </div>
    </div>
  );
}
