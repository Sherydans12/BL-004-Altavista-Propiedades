'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Property } from '@/types/property';
import PropertyCard from './PropertyCard';
import { SlidersHorizontal, RefreshCw, X, Building2 } from 'lucide-react';
import { formatCLP } from '@/lib/utils';

interface PropertiesListClientProps {
  initialProperties: Property[];
  isOffline: boolean;
}

export default function PropertiesListClient({ initialProperties, isOffline }: PropertiesListClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL params if present
  const urlOperation = searchParams.get('operation') || '';
  const urlType = searchParams.get('type') || '';
  const urlComuna = searchParams.get('comuna') || '';

  // Filter States
  const [operation, setOperation] = useState<string>(urlOperation);
  const [type, setType] = useState<string>(urlType);
  const [comuna, setComuna] = useState<string>(urlComuna);
  const [bedrooms, setBedrooms] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');


  // Unique Comunas from data to dynamically populate filter options
  const uniqueComunas = useMemo(() => {
    const comunas = initialProperties.map((p) => p.comuna).filter(Boolean);
    return Array.from(new Set(comunas)).sort();
  }, [initialProperties]);

  // Unique types from data
  const uniqueTypes = useMemo(() => {
    const types = initialProperties.map((p) => p.type).filter(Boolean);
    return Array.from(new Set(types)).sort();
  }, [initialProperties]);

  // Apply filters
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((p) => {
      // Operation filter
      if (operation && p.operation !== operation) return false;
      
      // Type filter
      if (type && p.type !== type) return false;
      
      // Comuna filter
      if (comuna && p.comuna.toLowerCase() !== comuna.toLowerCase()) return false;
      
      // Bedrooms filter
      if (bedrooms && p.bedrooms < parseInt(bedrooms, 10)) return false;
      
      // Max Price filter (Check CLP. If property has UF price, we can estimate CLP price by multiplying by 40000 approx, or filter by priceCLP)
      if (maxPrice) {
        const maxPriceNum = parseInt(maxPrice, 10);
        if (p.priceCLP > maxPriceNum) return false;
      }

      return true;
    });
  }, [initialProperties, operation, type, comuna, bedrooms, maxPrice]);

  const handleResetFilters = () => {
    setOperation('');
    setType('');
    setComuna('');
    setBedrooms('');
    setMaxPrice('');
    router.push('/propiedades');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Offline Alert */}
      {isOffline && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-amber-800 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
            <span>
              Mostrando catálogo referencial
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2">
          Catálogo de Propiedades
        </h1>
        <p className="text-slate-500 font-light">
          Explora propiedades exclusivas en venta y arriendo con el respaldo de Altavista.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Filters Panel (Left column - 3 wide) */}
        <aside className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
            <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-2 text-teal-800" />
              Filtros
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-slate-400 hover:text-teal-800 flex items-center transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Limpiar
            </button>
          </div>

          <div className="space-y-5">
            {/* Operación */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Operación
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOperation(operation === 'venta' ? '' : 'venta')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                    operation === 'venta'
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Venta
                </button>
                <button
                  type="button"
                  onClick={() => setOperation(operation === 'arriendo' ? '' : 'arriendo')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                    operation === 'arriendo'
                      ? 'bg-teal-800 border-teal-800 text-white'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Arriendo
                </button>
              </div>
            </div>

            {/* Tipo */}
            <div>
              <label htmlFor="filter-type" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Tipo de Propiedad
              </label>
              <select
                id="filter-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              >
                <option value="">Todos los tipos</option>
                {uniqueTypes.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Comuna */}
            <div>
              <label htmlFor="filter-comuna" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Comuna
              </label>
              <select
                id="filter-comuna"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              >
                <option value="">Todas las comunas</option>
                {uniqueComunas.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Dormitorios */}
            <div>
              <label htmlFor="filter-bedrooms" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Dormitorios (Mínimo)
              </label>
              <select
                id="filter-bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              >
                <option value="">Cualquiera</option>
                <option value="1">1+ Dormitorios</option>
                <option value="2">2+ Dormitorios</option>
                <option value="3">3+ Dormitorios</option>
                <option value="4">4+ Dormitorios</option>
                <option value="5">5+ Dormitorios</option>
              </select>
            </div>

            {/* Precio Máximo */}
            <div>
              <label htmlFor="filter-price" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Precio Máximo (CLP)
              </label>
              <input
                id="filter-price"
                type="number"
                placeholder="Ej: 500000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              />
              {maxPrice && (
                <span className="text-[10px] text-teal-800 font-medium mt-1 block">
                  Filtrando hasta: {formatCLP(parseInt(maxPrice, 10))}
                </span>
              )}
            </div>
          </div>
        </aside>

        {/* Results grid (Right column - 9 wide) */}
        <section className="lg:col-span-9">
          {/* Results count & active tags */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
            <p className="text-sm font-semibold text-slate-500">
              Mostrando <span className="text-teal-900 font-bold">{filteredProperties.length}</span> propiedades
            </p>
            
            {/* Active filters pill display */}
            <div className="flex flex-wrap gap-2 items-center">
              {operation && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                  {operation === 'venta' ? 'Venta' : 'Arriendo'}
                  <button onClick={() => setOperation('')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {type && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                  {type}
                  <button onClick={() => setType('')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {comuna && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                  {comuna}
                  <button onClick={() => setComuna('')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {bedrooms && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                  {bedrooms}+ Dorms
                  <button onClick={() => setBedrooms('')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                  Max: {formatCLP(parseInt(maxPrice, 10))}
                  <button onClick={() => setMaxPrice('')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Empty State */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">No encontramos resultados</h3>
              <p className="text-slate-500 font-light max-w-sm mx-auto text-sm">
                Prueba cambiando los criterios de búsqueda o limpiando todos los filtros para ver el catálogo completo.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 shadow-sm transition-colors cursor-pointer"
              >
                Limpiar Todos los Filtros
              </button>
            </div>
          ) : (
            /* Property Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
