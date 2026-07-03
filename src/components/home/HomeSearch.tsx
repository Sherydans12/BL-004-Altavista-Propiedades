'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building2 } from 'lucide-react';

export default function HomeSearch() {
  const router = useRouter();
  const [operation, setOperation] = useState<'venta' | 'arriendo'>('venta');
  const [type, setType] = useState<string>('');
  const [comuna, setComuna] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('operation', operation);
    if (type) params.append('type', type);
    if (comuna) params.append('comuna', comuna);

    router.push(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl premium-panel p-4 sm:p-5 lg:p-6 animate-fade-in">
      <div className="flex flex-col gap-4 border-b border-[#b8aa94]/30 pb-4 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b77946]">Búsqueda curada</p>
          <p className="mt-1 text-sm text-[#5f6b65]">Filtra por intención, comuna y tipo de propiedad.</p>
        </div>
        <div className="flex rounded-full border border-[#b8aa94]/40 bg-[#efe7d8]/55 p-1">
        <button
          type="button"
          onClick={() => setOperation('venta')}
          className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase transition-all ${
            operation === 'venta'
              ? 'bg-[#b77946] text-white shadow-sm'
              : 'text-[#5f6b65] hover:text-[#0f3d3e]'
          }`}
        >
          Comprar
        </button>
        <button
          type="button"
          onClick={() => setOperation('arriendo')}
          className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase transition-all ${
            operation === 'arriendo'
              ? 'bg-[#0f3d3e] text-white shadow-sm'
              : 'text-[#5f6b65] hover:text-[#0f3d3e]'
          }`}
        >
          Arrendar
        </button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Comuna Selection */}
        <div className="flex flex-col">
          <label htmlFor="comuna" className="text-xs font-semibold text-[#5f6b65] uppercase tracking-[0.18em] mb-2 flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#8a9a87]" />
            Ubicación / Comuna
          </label>
          <select
            id="comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            className="field-premium px-4 py-3"
          >
            <option value="">Todas las comunas</option>
            <option value="Las Condes">Las Condes</option>
            <option value="Vitacura">Vitacura</option>
            <option value="Lo Barnechea">Lo Barnechea</option>
            <option value="Providencia">Providencia</option>
            <option value="Ñuñoa">Ñuñoa</option>
            <option value="Santiago">Santiago</option>
            <option value="Colina">Colina (Chicureo)</option>
          </select>
        </div>

        {/* Property Type Selection */}
        <div className="flex flex-col">
          <label htmlFor="type" className="text-xs font-semibold text-[#5f6b65] uppercase tracking-[0.18em] mb-2 flex items-center">
            <Building2 className="w-3.5 h-3.5 mr-1 text-[#8a9a87]" />
            Tipo de Propiedad
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="field-premium px-4 py-3"
          >
            <option value="">Todos los tipos</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="oficina">Oficina</option>
            <option value="terreno">Terreno</option>
            <option value="local">Local Comercial</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="btn-primary w-full py-3 cursor-pointer"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar propiedades
          </button>
        </div>
      </form>
    </div>
  );
}
