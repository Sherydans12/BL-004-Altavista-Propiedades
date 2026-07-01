'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Clock,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import { submitContactLead } from '@/lib/inmodesk-api';

export default function ContactoPage() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'telefono' | 'email' | 'whatsapp'>('whatsapp');

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await submitContactLead({
        name,
        email,
        phone,
        subject,
        message,
        preferredContactMethod
      });

      if (response.success) {
        setSubmitStatus('success');
        // Clear fields
        setName('');
        setEmail('');
        setPhone('');
        setSubject('general');
        setMessage('');
        setPreferredContactMethod('whatsapp');
      } else {
        setSubmitStatus('error');
        setErrorMessage(response.error || 'Ocurrió un error al enviar el formulario.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Error de conexión con el servidor. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 block mb-2">Canales de Atención</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Contacto</h1>
        <p className="text-slate-500 font-light mt-3">
          ¿Quieres agendar una reunión, comprar, vender o arrendar? Escríbenos y un asesor te responderá hoy mismo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Info */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-serif font-bold text-xl text-slate-900 pb-4 border-b border-slate-50">
              Datos de Oficina
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center flex-shrink-0 mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dirección</p>
                  <p className="text-slate-700 text-sm mt-0.5">Av. Apoquindo 3200, Las Condes, Santiago</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center flex-shrink-0 mr-4">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Teléfono / WhatsApp</p>
                  <a href="tel:+56987654321" className="text-slate-700 text-sm mt-0.5 hover:text-teal-800 block">
                    +56 9 8765 4321
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center flex-shrink-0 mr-4">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Correo Electrónico</p>
                  <a href="mailto:contacto@altavistapropiedades.cl" className="text-slate-700 text-sm mt-0.5 hover:text-teal-800 block">
                    contacto@altavistapropiedades.cl
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center flex-shrink-0 mr-4">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Horario de Atención</p>
                  <p className="text-slate-700 text-sm mt-0.5">Lunes a Viernes: 09:00 - 18:30 hrs</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Connect */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">En Redes Sociales</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/altavistapropiedades"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 text-sm text-slate-600 hover:text-teal-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Instagram className="w-5 h-5" />
                </div>
                <span>@altavistapropiedades</span>
              </a>
              
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 text-sm text-slate-600 hover:text-teal-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span>Altavista Propiedades</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Form (7 cols) */}
        <div className="lg:col-span-7">
          
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-md shadow-slate-100/50">
            <h2 className="font-serif font-bold text-xl text-slate-900 mb-6">
              Enviar un Mensaje
            </h2>

             {/* Success Alert */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-2xl text-teal-900 space-y-2">
                <div className="flex items-center space-x-2 text-teal-800">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <strong className="text-sm">¡Mensaje enviado con éxito!</strong>
                </div>
                <p className="text-xs font-light">
                  Tu consulta fue recibida. Un asesor de Altavista te contactará pronto.
                </p>
              </div>
            )}

            {/* Error Alert */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-950 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-xs font-light">
                  {errorMessage || 'Por favor, completa todos los campos obligatorios antes de enviar.'}
                </span>
              </div>
            )}

            {/* Form fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Nicolás Fuentes"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="nicolas@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Teléfono *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Subject / Motivo */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Motivo del Contacto
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
                  >
                    <option value="general">Consulta General</option>
                    <option value="publicar">Quiero Publicar una Propiedad</option>
                    <option value="visita">Coordinar una Visita</option>
                    <option value="otro">Otro Motivo</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label htmlFor="preferredContactMethod" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Método Preferido *
                  </label>
                  <select
                    id="preferredContactMethod"
                    value={preferredContactMethod}
                    onChange={(e) => setPreferredContactMethod(e.target.value as 'telefono' | 'email' | 'whatsapp')}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telefono">Teléfono</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Detalla tu requerimiento o consulta..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-1 focus:ring-teal-700 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50 flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando Mensaje...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Consulta
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
