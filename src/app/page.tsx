import React from 'react';
import Link from 'next/link';
import { fetchProperties } from '@/lib/inmodesk-api';
import { FALLBACK_PROPERTIES } from '@/lib/fallback-data';
import HomeSearch from '@/components/home/HomeSearch';
import PropertyCard from '@/components/properties/PropertyCard';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Compass,
  FileText,
  KeyRound,
  MessageCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let properties = [];
  let isApiOffline = false;

  try {
    const rawProperties = await fetchProperties();
    properties = rawProperties.filter(p => p.isPublished && p.status === 'disponible');
  } catch (error) {
    console.warn("InmoDesk API offline or unreachable. Using fallback offline data.", error);
    isApiOffline = true;
    properties = FALLBACK_PROPERTIES;
  }

  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 3);
  const valueItems = [
    ['01', 'Publicación cuidada', 'Fotografía, orden visual y descripciones con foco comercial para que cada propiedad se perciba mejor.'],
    ['02', 'Seguimiento comercial', 'Reportes claros de interesados, visitas y señales reales de mercado durante el proceso.'],
    ['03', 'Visitas coordinadas', 'Agenda ordenada, filtros previos y acompañamiento cercano para proteger tu tiempo.'],
    ['04', 'Información centralizada', 'Datos, formularios y trazabilidad conectados a InmoDesk sin fricción para el equipo comercial.'],
  ];

  const processItems = [
    { icon: FileText, title: 'Evaluamos', description: 'Levantamos datos, precio y contexto comercial.' },
    { icon: CalendarCheck, title: 'Coordinamos', description: 'Ordenamos visitas y contacto con interesados.' },
    { icon: MessageCircle, title: 'Reportamos', description: 'Mantenemos visibilidad de avances y señales.' },
    { icon: KeyRound, title: 'Cerramos', description: 'Acompañamos la etapa final con claridad.' },
  ];

  return (
    <div className="overflow-hidden">
      {isApiOffline && (
        <div className="editorial-container mt-6">
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c89b3c]/35 bg-[#fff7df] px-3 py-1.5 text-xs font-semibold text-[#7b4a21] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c89b3c] animate-pulse" />
              Mostrando catálogo referencial
            </div>
          </div>
        </div>
      )}

      <section className="relative -mt-20 overflow-hidden bg-deep texture-grain pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="editorial-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-7">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#c89b3c]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d8c7a3]">
                  Corredora boutique en Santiago
                </span>
              </div>
              <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#f7f0e6] leading-[1.04]">
                Propiedades con mirada editorial y gestión humana.
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-[#efe7d8]/78 font-light leading-relaxed">
                Seleccionamos, presentamos y acompañamos cada propiedad con criterio comercial, calidez y una estética que la hace memorable.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/propiedades" className="btn-copper">
                  Ver propiedades
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/publica-con-nosotros" className="inline-flex items-center justify-center rounded-xl border border-[#d8c7a3]/35 px-5 py-3 text-sm font-semibold text-[#f7f0e6] transition-all hover:bg-white/10">
                  Publicar con Altavista
                </Link>
              </div>
              <div className="grid max-w-xl grid-cols-3 gap-4 border-t border-[#f4efe6]/15 pt-6 text-[#efe7d8]/78">
                <div>
                  <p className="font-serif text-2xl text-[#f7f0e6]">360°</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em]">Gestión</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-[#f7f0e6]">1:1</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em]">Asesoría</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-[#f7f0e6]">CRM</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em]">InmoDesk</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative ml-auto max-w-xl">
                <div className="absolute -left-5 top-10 hidden h-72 w-28 border border-[#d8c7a3]/35 lg:block" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[8rem] rounded-b-[1.5rem] border border-[#d8c7a3]/25 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    alt="Casa premium representativa de Altavista Propiedades"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102a2a]/78 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#d8c7a3] font-semibold mb-2">Selección residencial</p>
                    <p className="font-serif font-bold text-2xl text-white">Lo Curro, Vitacura</p>
                  </div>
                </div>
                <div className="absolute -bottom-5 right-4 max-w-[15rem] rounded-2xl border border-[#d8c7a3]/35 bg-[#f4efe6]/92 p-4 text-[#17201f] shadow-xl backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#b77946]">Nº 004</p>
                  <p className="mt-2 font-serif text-xl leading-tight">Catálogo boutique conectado a InmoDesk.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <HomeSearch />
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="editorial-badge mb-4">Exclusividad y diseño</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#17201f]">Propiedades destacadas</h2>
              <p className="mt-3 max-w-xl text-[#5f6b65]">
                Una selección con imagen protagonista, información clara y recorrido pensado para decidir mejor.
              </p>
            </div>
            <Link
              href="/propiedades"
              className="inline-flex items-center text-[#0f3d3e] hover:text-[#b77946] font-semibold text-sm"
            >
              Ver todas las propiedades <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="editorial-badge mb-4">Manifiesto de servicio</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#17201f]">
                Corretaje con criterio, no solo publicación.
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {valueItems.map(([number, title, description]) => (
                <div key={number} className="border-t border-[#b8aa94]/45 pt-5">
                  <p className="font-serif text-5xl text-[#b77946]/80">{number}</p>
                  <h3 className="mt-4 font-serif text-xl font-bold text-[#17201f]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f6b65]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#efe7d8]">
        <div className="editorial-container">
          <div className="max-w-2xl mb-12">
            <span className="editorial-badge mb-4">Compra o arriendo</span>
            <h2 className="text-3xl font-serif font-bold text-[#17201f] mb-4">Elige el tipo de búsqueda</h2>
            <p className="text-[#5f6b65] font-light">
              Dos entradas simples al catálogo, con una experiencia visual más cuidada para explorar sin ruido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group rounded-[1.5rem] overflow-hidden shadow-md aspect-[16/10] bg-[#102a2a] flex items-center">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                alt="Compra de propiedades"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#102a2a]/90 via-[#102a2a]/45 to-transparent" />
              <div className="relative z-10 p-8 sm:p-12 text-white max-w-md">
                <span className="text-[#d8c7a3] text-xs font-bold uppercase tracking-[0.24em] mb-2 block">Inversión y hogar</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3">Quiero Comprar</h3>
                <p className="text-[#efe7d8]/82 text-sm font-light leading-relaxed mb-6">
                  Casas exclusivas y departamentos con excelente conectividad y plusvalía asegurada.
                </p>
                <Link href="/propiedades?operation=venta" className="btn-copper py-2.5 cursor-pointer">
                  Explorar venta
                </Link>
              </div>
            </div>

            <div className="relative group rounded-[1.5rem] overflow-hidden shadow-md aspect-[16/10] bg-[#102a2a] flex items-center">
              <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                alt="Arriendo de propiedades"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#102a2a]/90 via-[#102a2a]/45 to-transparent" />
              <div className="relative z-10 p-8 sm:p-12 text-white max-w-md">
                <span className="text-[#8a9a87] text-xs font-bold uppercase tracking-[0.24em] mb-2 block">Flexibilidad y comodidad</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3">Quiero Arrendar</h3>
                <p className="text-[#efe7d8]/82 text-sm font-light leading-relaxed mb-6">
                  Los mejores departamentos y casas listos para habitar, en barrios residenciales consolidados.
                </p>
                <Link
                  href="/propiedades?operation=arriendo"
                  className="inline-flex items-center justify-center rounded-xl bg-[#f7f0e6] px-5 py-2.5 text-sm font-semibold text-[#102a2a] transition-all hover:bg-[#0f3d3e] hover:text-white cursor-pointer"
                >
                  Explorar arriendo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-deep texture-grain text-white relative overflow-hidden">
        <div className="editorial-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center rounded-full border border-[#d8c7a3]/25 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#d8c7a3]">
                Para propietarios
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
                Vender o arrendar también puede sentirse ordenado.
              </h2>
              <p className="text-[#efe7d8]/78 font-light text-base leading-relaxed max-w-xl">
                Te acompañamos desde la valorización comercial y preparación visual hasta la gestión de visitas y el cierre legal.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#efe7d8]/86 font-light">
                {['Sesión de fotos y video profesional', 'Publicación en portales líderes', 'Filtrado estricto de interesados', 'Apoyo documental de cierre'].map((item) => (
                  <li key={item} className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-[#c89b3c] mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Link href="/publica-con-nosotros" className="btn-copper px-8 py-4 text-base cursor-pointer">
                <Compass className="w-5 h-5 mr-2" />
                Conocer el servicio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="editorial-container">
          <div className="max-w-2xl mb-16">
            <span className="editorial-badge mb-4">Proceso Altavista</span>
            <h2 className="text-3xl font-serif font-bold text-[#17201f]">Un flujo simple, con seguimiento real.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 rounded-[1.5rem] border border-[#b8aa94]/40 bg-[#f7f0e6]/60 overflow-hidden">
            {processItems.map(({ icon: Icon, title, description }) => (
              <div key={title} className="border-b border-[#b8aa94]/35 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <Icon className="h-7 w-7 text-[#b77946]" />
                <h3 className="mt-5 font-serif text-xl font-bold text-[#17201f]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5f6b65]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="editorial-container">
          <div className="mx-auto max-w-4xl rounded-[1.5rem] border border-[#b8aa94]/35 bg-[#102a2a] px-6 py-12 text-center text-white shadow-xl sm:px-10">
            <h2 className="text-3xl font-serif font-bold">¿Tienes dudas o buscas asesoría inmediata?</h2>
            <p className="text-[#efe7d8]/75 font-light max-w-md mx-auto mt-4">
              Hablemos hoy. Nuestro equipo de asesores está listo para ayudarte en la búsqueda o venta de tu propiedad.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link href="/contacto" className="btn-copper cursor-pointer">
                Enviar mensaje
              </Link>
              <a
                href="https://wa.me/56987654321"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[#d8c7a3]/25 bg-white/8 px-6 py-3 text-sm font-semibold text-[#f7f0e6] transition-all hover:bg-white/14"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
