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
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
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
    <div className="py-12">
      <div className="editorial-container">
      <div className="mx-auto mb-16 max-w-3xl rounded-[1.75rem] bg-deep texture-grain px-6 py-12 text-center text-[#f7f0e6] sm:px-10">
        <span className="inline-flex items-center rounded-full border border-[#d8c7a3]/25 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c7a3]">Canales de atención</span>
        <h1 className="mt-5 text-3xl sm:text-5xl font-serif font-bold">Contacto</h1>
        <p className="text-[#efe7d8]/76 font-light mt-4">
          ¿Quieres agendar una reunión, comprar, vender o arrendar? Escríbenos y un asesor te responderá hoy mismo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Info */}
          <div className="premium-panel p-6 sm:p-8 space-y-6">
            <h2 className="font-serif font-bold text-xl text-[#17201f] pb-4 border-b border-[#b8aa94]/30">
              Datos de oficina
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0 mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5f6b65] uppercase tracking-wider">Dirección</p>
                  <p className="text-[#17201f] text-sm mt-0.5">Av. Apoquindo 3200, Las Condes, Santiago</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0 mr-4">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5f6b65] uppercase tracking-wider">Teléfono / WhatsApp</p>
                  <a href="tel:+56987654321" className="text-[#17201f] text-sm mt-0.5 hover:text-[#0f3d3e] block">
                    +56 9 8765 4321
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0 mr-4">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5f6b65] uppercase tracking-wider">Correo Electrónico</p>
                  <a href="mailto:contacto@altavistapropiedades.cl" className="text-[#17201f] text-sm mt-0.5 hover:text-[#0f3d3e] block break-all">
                    contacto@altavistapropiedades.cl
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d3e] text-[#f7f0e6] flex items-center justify-center flex-shrink-0 mr-4">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5f6b65] uppercase tracking-wider">Horario de Atención</p>
                  <p className="text-[#17201f] text-sm mt-0.5">Lunes a Viernes: 09:00 - 18:30 hrs</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Connect */}
          <div className="premium-panel p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#17201f]">En redes sociales</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/altavistapropiedades"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 text-sm text-[#5f6b65] hover:text-[#0f3d3e] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#efe7d8] flex items-center justify-center">
                  <Instagram className="w-5 h-5" />
                </div>
                <span>@altavistapropiedades</span>
              </a>
              
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 text-sm text-[#5f6b65] hover:text-[#0f3d3e] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#efe7d8] flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span>Altavista Propiedades</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Form (7 cols) */}
        <div className="lg:col-span-7">
          
          <div className="premium-panel p-6 sm:p-8">
            <h2 className="font-serif font-bold text-xl text-[#17201f] mb-6">
              Enviar un mensaje
            </h2>

            {/* Success Alert */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-[#f0f5ed] border border-[#8a9a87]/35 rounded-2xl text-[#17201f] space-y-2">
                <div className="flex items-center space-x-2 text-[#0f3d3e]">
                  <CheckCircle2 className="w-5 h-5 text-[#0f3d3e] flex-shrink-0" />
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
                  <label htmlFor="name" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-wider mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Nicolás Fuentes"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="field-premium"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-wider mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="nicolas@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-premium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-wider mb-1">
                    Teléfono *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field-premium"
                  />
                </div>

                {/* Subject / Motivo */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-wider mb-1">
                    Motivo del Contacto
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="field-premium"
                  >
                    <option value="general">Consulta General</option>
                    <option value="publicar">Quiero Publicar una Propiedad</option>
                    <option value="visita">Coordinar una Visita</option>
                    <option value="otro">Otro Motivo</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label htmlFor="preferredContactMethod" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-wider mb-1">
                    Método Preferido *
                  </label>
                  <select
                    id="preferredContactMethod"
                    value={preferredContactMethod}
                    onChange={(e) => setPreferredContactMethod(e.target.value as 'telefono' | 'email' | 'whatsapp')}
                    className="field-premium"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telefono">Teléfono</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#5f6b65] uppercase tracking-wider mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Detalla tu requerimiento o consulta..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-premium resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full cursor-pointer disabled:opacity-50"
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
    </div>
  );
}
