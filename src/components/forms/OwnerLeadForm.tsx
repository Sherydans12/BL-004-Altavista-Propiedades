'use client';

import React, { useState } from 'react';
import { submitOwnerLead } from '@/lib/inmodesk-api';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  DollarSign, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export default function OwnerLeadForm() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [operationIntent, setOperationIntent] = useState<'venta' | 'arriendo' | 'ambos' | 'no_definido'>('venta');
  const [propertyType, setPropertyType] = useState('casa');
  const [propertyComuna, setPropertyComuna] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');
  const [message, setMessage] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'telefono' | 'email' | 'whatsapp'>('whatsapp');

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !propertyComuna.trim() || !propertyType) {
      setSubmitStatus('error');
      setErrorMessage('Por favor, completa todos los campos obligatorios (*).');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await submitOwnerLead({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        operationIntent,
        propertyType: propertyType.trim(),
        propertyComuna: propertyComuna.trim(),
        propertyAddress: propertyAddress.trim() || undefined,
        estimatedPrice: estimatedPrice ? Number(estimatedPrice) : undefined,
        message: message.trim() || undefined,
        preferredContactMethod
      });

      if (response.success) {
        setSubmitStatus('success');
        // Clear all fields
        setName('');
        setEmail('');
        setPhone('');
        setOperationIntent('venta');
        setPropertyType('casa');
        setPropertyComuna('');
        setPropertyAddress('');
        setEstimatedPrice('');
        setMessage('');
        setPreferredContactMethod('whatsapp');
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

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-100/40 max-w-4xl mx-auto">
      <div className="mb-8">
        <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2 text-center sm:text-left">Formulario de Captación</h3>
        <p className="text-slate-500 font-light text-sm text-center sm:text-left">
          Ingresa los detalles básicos de tu propiedad y nuestro equipo comercial te contactará para una evaluación.
        </p>
      </div>

      {/* Success Alert */}
      {submitStatus === 'success' && (
        <div className="mb-8 p-5 bg-teal-50 border border-teal-200 rounded-2xl text-teal-900 space-y-2">
          <div className="flex items-center space-x-2 text-teal-800">
            <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0" />
            <strong className="text-base font-semibold">¡Datos recibidos con éxito!</strong>
          </div>
          <p className="text-sm font-light leading-relaxed">
            Recibimos los datos de tu propiedad. Un asesor evaluará la información y te contactará.
          </p>
        </div>
      )}

      {/* Error Alert */}
      {submitStatus === 'error' && (
        <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl text-red-950 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <span className="text-sm font-light">
            {errorMessage || 'Por favor, completa todos los campos obligatorios antes de enviar.'}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Contact Info */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-widest border-b border-slate-50 pb-2">
            1. Información del Propietario
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="owner-name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Nombre Completo *
              </label>
              <input
                id="owner-name"
                type="text"
                required
                placeholder="Ej: Nicolás Fuentes"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="owner-email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Correo Electrónico *
              </label>
              <input
                id="owner-email"
                type="email"
                required
                placeholder="Ej: nicolas@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="owner-phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Teléfono *
              </label>
              <input
                id="owner-phone"
                type="tel"
                required
                placeholder="Ej: +56 9 8765 4321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Property Info */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-widest border-b border-slate-50 pb-2">
            2. Detalles de la Propiedad
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Operation Intent */}
            <div>
              <label htmlFor="owner-intent" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1 text-slate-400" />
                ¿Qué deseas hacer? *
              </label>
              <select
                id="owner-intent"
                value={operationIntent}
                onChange={(e) => setOperationIntent(e.target.value as 'venta' | 'arriendo' | 'ambos' | 'no_definido')}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              >
                <option value="venta">Vender</option>
                <option value="arriendo">Arrendar</option>
                <option value="ambos">Vender o Arrendar (Ambos)</option>
                <option value="no_definido">No definido aún</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="owner-property-type" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Tipo de Propiedad *
              </label>
              <select
                id="owner-property-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              >
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="oficina">Oficina</option>
                <option value="terreno">Terreno</option>
                <option value="local">Local Comercial</option>
                <option value="industrial">Bodega / Industrial</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Comuna */}
            <div>
              <label htmlFor="owner-comuna" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Comuna *
              </label>
              <input
                id="owner-comuna"
                type="text"
                required
                placeholder="Ej: Las Condes"
                value={propertyComuna}
                onChange={(e) => setPropertyComuna(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address */}
            <div>
              <label htmlFor="owner-address" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Dirección o Sector Aproximado
              </label>
              <input
                id="owner-address"
                type="text"
                placeholder="Ej: Sector El Golf / Av. Apoquindo 3000"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Estimated Price */}
            <div>
              <label htmlFor="owner-price" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <DollarSign className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Precio Estimado (Opcional en CLP o UF)
              </label>
              <input
                id="owner-price"
                type="number"
                placeholder="Ej: 850000000"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact details & comments */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-semibold text-teal-800 uppercase tracking-widest border-b border-slate-50 pb-2">
            3. Preferencias de Contacto
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Preferred Contact Method */}
            <div className="md:col-span-1">
              <label htmlFor="owner-preferred-method" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Método Preferido *
              </label>
              <select
                id="owner-preferred-method"
                value={preferredContactMethod}
                onChange={(e) => setPreferredContactMethod(e.target.value as 'telefono' | 'email' | 'whatsapp')}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="telefono">Teléfono</option>
                <option value="email">Email</option>
              </select>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="owner-msg" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <MessageSquare className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Mensaje o Comentarios Adicionales
              </label>
              <textarea
                id="owner-msg"
                rows={2}
                placeholder="Cuéntanos más detalles de tu propiedad (dormitorios, estado, etc.)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-slate-50 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando Propiedad...
              </span>
            ) : (
              <>
                Enviar Solicitud
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
