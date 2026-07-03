'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { submitLead } from '@/lib/inmodesk-api';
import { formatCLP, formatUF } from '@/lib/utils';
import { 
  BedDouble, 
  Bath, 
  Square, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Building2, 
  MessageSquare, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface PropertyDetailClientProps {
  property: Property;
  isOffline: boolean;
}

export default function PropertyDetailClient({ property, isOffline }: PropertyDetailClientProps) {
  const [activeImage, setActiveImage] = useState<string>(property.mainImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80');
  
  // Lead Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Hola, me interesa recibir más información sobre la propiedad "${property.title}" (${property.comuna}).`);
  
  // Form Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isVenta = property.operation === 'venta';
  const priceDisplay = isVenta 
    ? (property.priceUF ? formatUF(property.priceUF) : formatCLP(property.priceCLP))
    : formatCLP(property.priceCLP);
    
  const secondaryPriceDisplay = isVenta && property.priceUF && property.priceCLP
    ? formatCLP(property.priceCLP)
    : null;

  // Build WhatsApp link
  const encodedMsg = encodeURIComponent(
    `Hola, estoy interesado en la propiedad "${property.title}" (${property.comuna}) que vi en su web. Me gustaría coordinar una visita.`
  );
  const whatsappUrl = `https://wa.me/56987654321?text=${encodedMsg}`;

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await submitLead({
        name,
        email,
        phone,
        propertySlug: property.slug,
        message
      });

      if (response.success) {
        setSubmitStatus('success');
        // Clear fields
        setName('');
        setEmail('');
        setPhone('');
        setMessage(`Hola, me interesa recibir más información sobre la propiedad "${property.title}" (${property.comuna}).`);
      } else {
        setSubmitStatus('error');
        setErrorMessage('No pudimos enviar tu consulta. Intenta nuevamente en unos minutos o contáctanos por WhatsApp.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('No pudimos enviar tu consulta. Intenta nuevamente en unos minutos o contáctanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Combine main image and secondary images
  const allImages = [property.mainImage, ...(property.images || [])].filter(Boolean);

  return (
    <div className="py-8 sm:py-10">
      <div className="editorial-container">
      <div className="mb-6">
        <Link 
          href="/propiedades" 
          className="inline-flex items-center text-sm font-semibold text-[#5f6b65] hover:text-[#0f3d3e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al listado
        </Link>
      </div>

      {isOffline && (
        <div className="mb-8 p-4 bg-[#fff7df] border border-[#c89b3c]/35 rounded-2xl text-[#7b4a21] text-sm flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c89b3c] animate-pulse flex-shrink-0" />
          <span>
            Mostrando información referencial de la propiedad
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <div className="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden bg-[#102a2a] border border-[#b8aa94]/35 shadow-xl">
              <img
                src={activeImage}
                alt={property.title}
                className="w-full h-full object-cover transition-all"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102a2a]/75 via-transparent to-[#102a2a]/10" />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] shadow-sm ${
                  isVenta ? 'bg-[#b77946] text-white' : 'bg-[#0f3d3e] text-white'
                }`}>
                  {isVenta ? 'Venta' : 'Arriendo'}
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-[#d8c7a3]">{property.type} en {property.comuna}</p>
                <h1 className="mt-2 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl">
                  {property.title}
                </h1>
              </div>
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img ? 'border-[#b77946] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="premium-panel p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[#5f6b65] text-xs font-semibold uppercase tracking-[0.18em]">
              <span>{property.type}</span>
              <span>•</span>
              <span className="flex items-center text-[#0f3d3e] font-bold bg-[#efe7d8] px-2 py-0.5 rounded-md">
                {property.status.toUpperCase()}
              </span>
            </div>
            
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#17201f] leading-tight">
              {property.title}
            </h2>

            <div className="flex items-center text-[#5f6b65] text-sm">
              <MapPin className="w-5 h-5 text-[#b77946] mr-2 flex-shrink-0" />
              <span>{property.address}, {property.comuna}, {property.region}</span>
            </div>

            <div className="pt-4 border-t border-[#b8aa94]/30 flex items-baseline justify-between flex-wrap gap-4">
              <div>
                <p className="text-3xl font-bold text-[#0f3d3e] font-sans">{priceDisplay}</p>
                {secondaryPriceDisplay && (
                  <p className="text-sm text-[#5f6b65] font-light mt-1">
                    Valor referencial: {secondaryPriceDisplay}
                  </p>
                )}
              </div>
              <div className="text-right text-xs text-[#5f6b65]">
                <p>Publicada por <strong className="text-[#17201f]">{property.agentName || 'Altavista'}</strong></p>
              </div>
            </div>
          </div>

          <div className="premium-panel p-6 sm:p-8">
            <h2 className="font-serif font-bold text-lg text-[#17201f] mb-6">Ficha principal</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#efe7d8]/60">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#5f6b65] leading-none">Dormitorios</p>
                  <p className="font-semibold text-[#17201f] mt-1">{property.bedrooms}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#efe7d8]/60">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#5f6b65] leading-none">Baños</p>
                  <p className="font-semibold text-[#17201f] mt-1">{property.bathrooms}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#efe7d8]/60">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0">
                  <Square className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#5f6b65] leading-none">M² Útiles</p>
                  <p className="font-semibold text-[#17201f] mt-1">{property.areaConstruida} m²</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#efe7d8]/60">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#5f6b65] leading-none">M² Terreno</p>
                  <p className="font-semibold text-[#17201f] mt-1">{property.areaTerreno || property.areaConstruida} m²</p>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-panel p-6 sm:p-8">
            <h2 className="font-serif font-bold text-lg text-[#17201f] mb-4">Descripción</h2>
            <div className="text-[#5f6b65] font-light leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {property.description}
            </div>
          </div>

        </div>

        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="rounded-[1.5rem] border border-[#b8aa94]/35 bg-[#102a2a] p-6 text-[#f7f0e6] shadow-xl">
            <h3 className="font-serif font-bold text-xl mb-1">Me interesa esta propiedad</h3>
            <p className="text-[#efe7d8]/65 text-xs font-light mb-6">Envíanos tus datos y un agente te contactará de inmediato.</p>
            
            {/* Submit Success Alert */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-[#f4efe6] border border-[#d8c7a3] rounded-2xl text-[#17201f] space-y-2">
                <div className="flex items-center space-x-2 text-[#0f3d3e]">
                  <CheckCircle2 className="w-5 h-5 text-[#0f3d3e] flex-shrink-0" />
                  <strong className="text-sm">¡Mensaje enviado con éxito!</strong>
                </div>
                <p className="text-xs font-light">
                  Tu consulta fue recibida. Un asesor de Altavista te contactará pronto.
                </p>
              </div>
            )}

            {/* Submit Error Alert */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-950 space-y-2">
                <div className="flex items-center space-x-2 text-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <strong className="text-sm">Error al enviar</strong>
                </div>
                <p className="text-xs font-light">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Lead Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label htmlFor="lead-name" className="block text-xs font-semibold text-[#efe7d8]/75 uppercase tracking-wider mb-1 flex items-center">
                  <User className="w-3.5 h-3.5 mr-1 text-[#d8c7a3]" />
                  Nombre Completo *
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="Ej: Nicolás Fuentes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field-premium"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="lead-email" className="block text-xs font-semibold text-[#efe7d8]/75 uppercase tracking-wider mb-1 flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-[#d8c7a3]" />
                  Correo Electrónico *
                </label>
                <input
                  id="lead-email"
                  type="email"
                  required
                  placeholder="Ej: nicolas@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field-premium"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="lead-phone" className="block text-xs font-semibold text-[#efe7d8]/75 uppercase tracking-wider mb-1 flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-[#d8c7a3]" />
                  Teléfono *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  placeholder="Ej: +56 9 8765 4321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="field-premium"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="lead-msg" className="block text-xs font-semibold text-[#efe7d8]/75 uppercase tracking-wider mb-1 flex items-center">
                  <MessageSquare className="w-3.5 h-3.5 mr-1 text-[#d8c7a3]" />
                  Mensaje
                </label>
                <textarea
                  id="lead-msg"
                  rows={3}
                  placeholder="Tu mensaje..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-premium resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-copper w-full cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando Consulta...
                  </span>
                ) : (
                  'Contactar Agente'
                )}
              </button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-[#d8c7a3]/20"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#102a2a] px-2 text-[#efe7d8]/60 font-semibold tracking-wider">o escríbenos directamente</span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-center border border-emerald-300/30 bg-emerald-500/12 hover:bg-emerald-600 hover:text-white text-emerald-100 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.792-4.382 9.795-9.79.001-2.62-1.01-5.086-2.846-6.927C16.378 2.047 13.911 1.033 11.29 1.033 5.882 1.033 1.49 5.42 1.488 10.83c-.001 1.516.402 3.002 1.168 4.316L1.628 20.2l5.019-1.046zm11.754-5.326c-.302-.151-1.787-.882-2.057-.981-.271-.099-.468-.151-.665.151-.197.302-.765.981-.938 1.18-.173.197-.346.223-.648.072-.302-.151-1.277-.47-2.433-1.5-.9-.8-1.507-1.79-1.684-2.09-.177-.302-.019-.465.132-.615.136-.135.302-.35.453-.524.151-.174.201-.298.302-.497.101-.198.05-.371-.025-.521-.075-.15-1.002-2.42-1.378-3.32-.366-.882-.736-.763-.883-.77h-.757c-.256 0-.671.096-.981.44-.31.344-1.185 1.16-1.185 2.831 0 1.671 1.218 3.284 1.386 3.51.168.225 2.396 3.66 5.805 5.13.81.35 1.443.56 1.936.717.814.26 1.554.223 2.138.136.652-.1 2.057-.84 2.347-1.653.29-.812.29-1.507.203-1.653-.086-.145-.316-.24-.619-.391z" />
              </svg>
              Contactar por WhatsApp
            </a>
          </div>

        </div>

      </div>
      </div>
    </div>
  );
}
