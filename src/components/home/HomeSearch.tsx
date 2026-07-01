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
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-100/80 border border-slate-100 p-6 sm:p-8 animate-fade-in">
      {/* Operation Tabs */}
      <div className="flex border-b border-slate-100 pb-4 mb-6">
        <button
          type="button"
          onClick={() => setOperation('venta')}
          className={`pb-2 px-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all mr-6 ${
            operation === 'venta'
              ? 'border-amber-500 text-teal-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Comprar
        </button>
        <button
          type="button"
          onClick={() => setOperation('arriendo')}
          className={`pb-2 px-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
            operation === 'arriendo'
              ? 'border-teal-800 text-teal-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Arrendar
        </button>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Comuna Selection */}
        <div className="flex flex-col">
          <label htmlFor="comuna" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Ubicación / Comuna
          </label>
          <select
            id="comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all outline-none"
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
          <label htmlFor="type" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
            <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Tipo de Propiedad
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all outline-none"
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
            className="w-full bg-teal-800 hover:bg-teal-900 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-teal-900/10 hover:shadow-lg transition-all flex items-center justify-center cursor-pointer"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar propiedades
          </button>
        </div>
      </form>
    </div>
  );
}
