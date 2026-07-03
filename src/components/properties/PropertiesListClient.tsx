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
    <div className="py-10 sm:py-12">
      <div className="editorial-container">
      {isOffline && (
        <div className="mb-8 p-4 bg-[#fff7df] border border-[#c89b3c]/35 rounded-2xl flex items-center justify-between text-[#7b4a21] text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c89b3c] animate-pulse flex-shrink-0" />
            <span>
              Mostrando catálogo referencial
            </span>
          </div>
        </div>
      )}

      <div className="mb-10 rounded-[1.75rem] bg-deep texture-grain px-6 py-10 text-[#f7f0e6] sm:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-[#d8c7a3]/25 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d8c7a3]">
            Catálogo curado
          </span>
          <h1 className="mt-5 text-3xl sm:text-5xl font-serif font-bold leading-tight">
            Propiedades para mirar con calma y decidir con datos.
          </h1>
          <p className="mt-4 max-w-2xl text-[#efe7d8]/78 font-light">
            Explora venta y arriendo con filtros claros, fichas visuales y respaldo de Altavista.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-3 premium-panel p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#b8aa94]/30">
            <h2 className="font-serif font-bold text-lg text-[#17201f] flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-2 text-[#b77946]" />
              Filtros
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[#5f6b65] hover:text-[#0f3d3e] flex items-center transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Limpiar
            </button>
          </div>

          <div className="space-y-5">
            {/* Operación */}
            <div>
              <label className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-[0.18em] mb-2">
                Operación
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOperation(operation === 'venta' ? '' : 'venta')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                    operation === 'venta'
                      ? 'bg-[#b77946] border-[#b77946] text-white'
                      : 'border-[#b8aa94]/45 text-[#5f6b65] hover:bg-[#efe7d8]'
                  }`}
                >
                  Venta
                </button>
                <button
                  type="button"
                  onClick={() => setOperation(operation === 'arriendo' ? '' : 'arriendo')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                    operation === 'arriendo'
                      ? 'bg-[#0f3d3e] border-[#0f3d3e] text-white'
                      : 'border-[#b8aa94]/45 text-[#5f6b65] hover:bg-[#efe7d8]'
                  }`}
                >
                  Arriendo
                </button>
              </div>
            </div>

            {/* Tipo */}
            <div>
              <label htmlFor="filter-type" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-[0.18em] mb-2">
                Tipo de Propiedad
              </label>
              <select
                id="filter-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="field-premium"
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
              <label htmlFor="filter-comuna" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-[0.18em] mb-2">
                Comuna
              </label>
              <select
                id="filter-comuna"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                className="field-premium"
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
              <label htmlFor="filter-bedrooms" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-[0.18em] mb-2">
                Dormitorios (Mínimo)
              </label>
              <select
                id="filter-bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="field-premium"
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
              <label htmlFor="filter-price" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-[0.18em] mb-2">
                Precio Máximo (CLP)
              </label>
              <input
                id="filter-price"
                type="number"
                placeholder="Ej: 500000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="field-premium"
              />
              {maxPrice && (
                <span className="text-[10px] text-[#0f3d3e] font-medium mt-1 block">
                  Filtrando hasta: {formatCLP(parseInt(maxPrice, 10))}
                </span>
              )}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-[#b8aa94]/35 gap-4">
            <p className="text-sm font-semibold text-[#5f6b65]">
              Mostrando <span className="text-[#0f3d3e] font-bold">{filteredProperties.length}</span> propiedades
            </p>
            
            <div className="flex flex-wrap gap-2 items-center">
              {operation && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#efe7d8] text-[#5f6b65]">
                  {operation === 'venta' ? 'Venta' : 'Arriendo'}
                  <button onClick={() => setOperation('')} className="hover:text-[#9c5a3c] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {type && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#efe7d8] text-[#5f6b65]">
                  {type}
                  <button onClick={() => setType('')} className="hover:text-[#9c5a3c] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {comuna && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#efe7d8] text-[#5f6b65]">
                  {comuna}
                  <button onClick={() => setComuna('')} className="hover:text-[#9c5a3c] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {bedrooms && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#efe7d8] text-[#5f6b65]">
                  {bedrooms}+ Dorms
                  <button onClick={() => setBedrooms('')} className="hover:text-[#9c5a3c] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#efe7d8] text-[#5f6b65]">
                  Max: {formatCLP(parseInt(maxPrice, 10))}
                  <button onClick={() => setMaxPrice('')} className="hover:text-[#9c5a3c] cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="premium-panel p-10 sm:p-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#efe7d8] flex items-center justify-center mx-auto text-[#8a9a87]">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#17201f]">No encontramos resultados</h3>
              <p className="text-[#5f6b65] font-light max-w-sm mx-auto text-sm">
                Prueba cambiando los criterios de búsqueda o limpiando todos los filtros para ver el catálogo completo.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-primary mt-2 cursor-pointer"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
      </div>
      </div>
    </div>
  );
}
