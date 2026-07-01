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
  description: 'Vende o arrienda tu propiedad de forma rápida, segura y al mejor precio con nuestro servicio de corretaje premium.',
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
      description: 'Redactamos las promesas de compraventa o contratos de arriendo a través de nuestro equipo legal para garantizar una transacción transparente.'
    }
  ];

  return (
    <div className="bg-slate-50/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner Section */}
        <div className="relative rounded-3xl overflow-hidden bg-teal-900 text-white p-8 sm:p-16 mb-16 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent_50%)]" />
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-800 text-teal-300">
              Vende o Arrienda con Expertos
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight">
              Nos encargamos de todo. Tú solo recibe el pago.
            </h1>
            <p className="text-teal-100/80 font-light text-base sm:text-lg leading-relaxed">
              En Altavista Propiedades transformamos el corretaje tradicional en una experiencia premium libre de estrés. Descubre por qué cientos de propietarios confían en nosotros.
            </p>
            <div className="pt-2">
              <a
                href="#form-publicar"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                Comenzar Evaluación Gratis
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Workflow Section */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 block mb-2">Paso a Paso</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Nuestro Proceso de Publicación</h2>
            <p className="text-slate-500 font-light mt-3">
              Un acompañamiento integral de inicio a fin para asegurar rapidez y seguridad legal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 mt-12 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image side */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" 
                  alt="Asesoría Premium"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* List side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Ventajas Altavista</span>
              <h2 className="text-3xl font-serif font-bold text-slate-900">¿Qué nos diferencia?</h2>
              
              <ul className="space-y-4 text-slate-600 font-light text-sm sm:text-base">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Marketing de Alta Exposición:</strong> Destacamos tu propiedad en portales nacionales (Portal Inmobiliario, TOCTOC, etc.) y en redes sociales con anuncios segmentados.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Filtro de Clientes Serios:</strong> Realizamos una precalificación financiera de los compradores (crédito aprobado) para no hacerte perder tiempo.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Reportes Periódicos:</strong> Recibe informes de visualizaciones en la web, visitas agendadas e interesados reales directamente en tu correo.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Red de Corredores:</strong> Colaboramos activamente con otras corredoras boutique de confianza para multiplicar los canales de venta.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Lead Capture Form Section */}
        <section id="form-publicar" className="mt-16 scroll-mt-20">
          <OwnerLeadForm />
        </section>

      </div>
    </div>
  );
}
