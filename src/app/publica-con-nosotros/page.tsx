import React from 'react';
import { 
  Building2, 
  Camera, 
  Users2, 
  CalendarDays, 
  Scale, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import OwnerLeadForm from '@/components/forms/OwnerLeadForm';

export const metadata = {
  title: 'Publica tu Propiedad | Altavista Propiedades',
  description: 'Vende o arrienda tu propiedad de forma rápida, segura y a un precio competitivo con nuestro servicio de corretaje premium.',
};

export default function PublicaConNosotrosPage() {
  
  const steps = [
    {
      icon: Building2,
      title: '1. Evaluación Comercial',
      description: 'Realizamos un estudio de mercado comparativo (ACM) para determinar el valor óptimo de venta o arriendo de tu propiedad.'
    },
    {
      icon: Camera,
      title: '2. Preparación Profesional',
      description: 'Coordinamos una sesión fotográfica y de video en alta definición para destacar los mejores atributos y espacios de tu hogar.'
    },
    {
      icon: Users2,
      title: '3. Gestión de Interesados',
      description: 'Filtramos rigurosamente a cada interesado, validando sus antecedentes comerciales y capacidad de financiamiento antes de la visita.'
    },
    {
      icon: CalendarDays,
      title: '4. Visitas Guiadas',
      description: 'Un asesor experto de Altavista acompaña en todo momento a los interesados y coordina las visitas en los horarios que te acomoden.'
    },
    {
      icon: Scale,
      title: '5. Cierre Legal Seguro',
      description: 'Redactamos las promesas de compraventa o contratos de arriendo a través de nuestro equipo legal para ayudar a resguardar una transacción transparente.'
    }
  ];

  return (
    <div className="py-12">
      <div className="editorial-container">
        <div className="relative mb-16 overflow-hidden rounded-[1.75rem] bg-deep texture-grain text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative z-10 p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.24em] border border-[#d8c7a3]/25 bg-white/8 text-[#d8c7a3]">
                Vende o arrienda con expertos
              </span>
              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                Tu propiedad, presentada con criterio boutique.
            </h1>
              <p className="mt-5 text-[#efe7d8]/80 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
                En Altavista Propiedades transformamos el corretaje tradicional en una experiencia clara, cálida y bien coordinada.
            </p>
              <div className="pt-7">
              <a
                href="#form-publicar"
                className="btn-copper cursor-pointer"
              >
                Comenzar evaluación
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              </div>
            </div>
            <div className="relative min-h-[18rem] lg:col-span-5">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
                alt="Interior residencial preparado para publicación inmobiliaria"
                className="absolute inset-0 h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#102a2a] via-[#102a2a]/35 to-transparent lg:bg-gradient-to-l" />
            </div>
          </div>
        </div>

        <section className="space-y-12">
          <div className="max-w-2xl">
            <span className="editorial-badge mb-4">Paso a paso</span>
            <h2 className="text-3xl font-serif font-bold text-[#17201f]">Nuestro proceso de publicación</h2>
            <p className="text-[#5f6b65] font-light mt-3">
              Un acompañamiento integral de inicio a fin para asegurar rapidez y seguridad legal.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-[1.5rem] border border-[#b8aa94]/40 bg-[#f7f0e6]/65 lg:grid-cols-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="border-b border-[#b8aa94]/35 p-6 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif text-4xl text-[#b77946]/55">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 font-serif font-bold text-base text-[#17201f] leading-tight">
                    {step.title.replace(`${idx + 1}. `, '')}
                  </h3>
                  <p className="mt-3 text-[#5f6b65] text-xs font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-20 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-t-[6rem] rounded-b-[1.25rem] overflow-hidden shadow-xl border border-[#b8aa94]/35">
                <img 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" 
                  alt="Asesoría Premium"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="editorial-badge">Ventajas Altavista</span>
              <h2 className="text-3xl font-serif font-bold text-[#17201f]">¿Qué nos diferencia?</h2>
              
              <ul className="space-y-4 text-[#5f6b65] font-light text-sm sm:text-base">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#b77946] mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Marketing de Alta Exposición:</strong> Destacamos tu propiedad en portales nacionales (Portal Inmobiliario, TOCTOC, etc.) y en redes sociales con anuncios segmentados.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#b77946] mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Filtro de Clientes Serios:</strong> Realizamos una precalificación financiera de los compradores (crédito aprobado) para no hacerte perder tiempo.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#b77946] mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Reportes Periódicos:</strong> Recibe informes de visualizaciones en la web, visitas agendadas e interesados reales directamente en tu correo.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#b77946] mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Red de Corredores:</strong> Colaboramos activamente con otras corredoras boutique de confianza para multiplicar los canales de venta.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        <section id="form-publicar" className="mt-16 scroll-mt-20">
          <OwnerLeadForm />
        </section>

      </div>
    </div>
  );
}
