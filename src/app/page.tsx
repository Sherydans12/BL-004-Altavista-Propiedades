import React from 'react';
import Link from 'next/link';
import { fetchProperties } from '@/lib/inmodesk-api';
import { FALLBACK_PROPERTIES } from '@/lib/fallback-data';
import HomeSearch from '@/components/home/HomeSearch';
import PropertyCard from '@/components/properties/PropertyCard';
import { ShieldCheck, HeartHandshake, Zap, Compass, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let properties = [];
  let isApiOffline = false;

  try {
    const rawProperties = await fetchProperties();
    // Filter active and published
    properties = rawProperties.filter(p => p.isPublished && p.status === 'disponible');
  } catch (error) {
    console.warn("InmoDesk API offline or unreachable. Using fallback offline data.", error);
    isApiOffline = true;
    properties = FALLBACK_PROPERTIES;
  }

  // Get featured properties
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="bg-slate-50/20">
      
      {/* API Connection Indicator Banner */}
      {isApiOffline && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Mostrando catálogo referencial
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left: Texts */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-50 text-teal-800">
                Corredora Boutique
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
                Encuentra el hogar que <span className="text-teal-800 font-light italic">define</span> tu estilo.
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Gestión inmobiliaria clara, cercana y profesional. Nos dedicamos a conectar personas con propiedades que inspiran bienestar en Santiago.
              </p>
            </div>

            {/* Hero Right: Images collage */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Altavista Propiedades Premium Living"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">Propiedad Destacada</p>
                  <p className="font-serif font-bold text-xl">Lo Curro, Vitacura</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Search Widget */}
          <div className="mt-16 flex justify-center">
            <HomeSearch />
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-50/30 rounded-bl-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-50/20 rounded-tr-[100px] -z-10" />
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 block mb-2">Exclusividad y Diseño</span>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Propiedades Destacadas</h2>
            </div>
            <Link
              href="/propiedades"
              className="mt-4 md:mt-0 inline-flex items-center text-teal-800 hover:text-teal-900 font-semibold text-sm hover:underline"
            >
              Ver todas las propiedades &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Buy vs Rent Operation Quick Selection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">¿Cuál es tu próximo objetivo?</h2>
            <p className="text-slate-500 font-light">Explora nuestro portafolio seleccionado de propiedades residenciales y comerciales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Compra Card */}
            <div className="relative group rounded-3xl overflow-hidden shadow-md aspect-[16/9] bg-slate-950 flex items-center">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                alt="Compra de propiedades"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent" />
              <div className="relative z-10 p-8 sm:p-12 text-white max-w-md">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 block">Inversión y Hogar</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3">Quiero Comprar</h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                  Casas exclusivas y departamentos con excelente conectividad y plusvalía asegurada.
                </p>
                <Link
                  href="/propiedades?operation=venta"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-amber-500 hover:text-white font-semibold text-sm transition-all cursor-pointer"
                >
                  Explorar Venta
                </Link>
              </div>
            </div>

            {/* Arriendo Card */}
            <div className="relative group rounded-3xl overflow-hidden shadow-md aspect-[16/9] bg-slate-950 flex items-center">
              <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                alt="Arriendo de propiedades"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent" />
              <div className="relative z-10 p-8 sm:p-12 text-white max-w-md">
                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-2 block">Flexibilidad y Comodidad</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3">Quiero Arrendar</h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                  Los mejores departamentos y casas listos para habitar, en barrios residenciales consolidados.
                </p>
                <Link
                  href="/propiedades?operation=arriendo"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-teal-800 hover:text-white font-semibold text-sm transition-all cursor-pointer"
                >
                  Explorar Arriendo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publish With Us CTA Section */}
      <section className="py-20 bg-teal-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-800 text-teal-300">
                Para Propietarios
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
                ¿Buscas vender o arrendar tu propiedad a un precio competitivo?
              </h2>
              <p className="text-teal-200/80 font-light text-base leading-relaxed max-w-xl">
                Te acompañamos en todo el proceso: desde la valorización comercial y sesión fotográfica profesional, hasta el cierre legal del contrato. Tu tranquilidad es nuestro principal pilar.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-teal-100 font-light">
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
                  Sesión de fotos y video profesional
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
                  Publicación en portales líderes
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
                  Filtrado estricto de interesados
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
                  Redacción de contratos de abogados
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Link
                href="/publica-con-nosotros"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-lg shadow-amber-500/10 hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Compass className="w-5 h-5 mr-2" />
                Conocer Nuestro Servicio
              </Link>
            </div>
          </div>
        </div>

        {/* Background details */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-800 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      </section>

      {/* Trust & Quality Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 block mb-2">Compromiso Altavista</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">¿Por qué confiar en nosotros?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Transparency */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Transparencia Total</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Sin comisiones ocultas ni sorpresas de última hora. Toda la documentación legal e informes comerciales están siempre a tu disposición.
              </p>
            </div>

            {/* Personalized Service */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mx-auto shadow-sm">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Asesoría Cercana</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs mx-auto">
                No somos una plataforma automatizada. Tendrás un agente dedicado con comunicación directa y reporte constante de visitas e interesados.
              </p>
            </div>

            {/* Agility */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mx-auto shadow-sm">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Gestión Ágil</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Aprovechamos herramientas digitales avanzadas para acelerar la publicación, calificar interesados al instante y coordinar visitas eficientemente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Contact Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-serif font-bold text-slate-900">¿Tienes dudas o buscas asesoría inmediata?</h2>
          <p className="text-slate-500 font-light max-w-md mx-auto">
            Hablemos hoy. Nuestro equipo de asesores está listo para ayudarte en la búsqueda o venta de tu propiedad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              Enviar Mensaje
            </Link>
            <a
              href="https://wa.me/56987654321"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white border border-slate-200 text-emerald-600 hover:bg-slate-50 font-semibold text-sm transition-all"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
