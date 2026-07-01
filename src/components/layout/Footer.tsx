import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand/Slogan */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center shadow-md">
                <span className="text-white font-serif text-xl font-bold">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-serif text-lg font-bold leading-tight tracking-tight">
                  Altavista
                </span>
                <span className="text-[10px] text-amber-500 font-medium uppercase tracking-wider leading-none">
                  Propiedades
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Gestión inmobiliaria clara, cercana y profesional. Encontramos el espacio ideal para tu vida.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Nuestra Web
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors flex items-center group">
                  Inicio
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/propiedades" className="hover:text-amber-500 transition-colors flex items-center group">
                  Propiedades
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/publica-con-nosotros" className="hover:text-amber-500 transition-colors flex items-center group">
                  Publica con nosotros
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-amber-500 transition-colors flex items-center group">
                  Contacto
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>Av. Apoquindo 3200, Las Condes, Santiago</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <a href="tel:+56987654321" className="hover:text-white transition-colors">
                  +56 9 8765 4321
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <a href="mailto:contacto@altavistapropiedades.cl" className="hover:text-white transition-colors">
                  contacto@altavistapropiedades.cl
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Síguenos
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://instagram.com/altavistapropiedades"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-700 transition-colors flex items-center justify-center text-slate-300 hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-700 transition-colors flex items-center justify-center text-slate-300 hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-slate-500 font-light">
              Demo pública conectada a InmoDesk SaaS API.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} Altavista Propiedades. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0 font-medium">
            Desarrollado para demostración de pipeline de venta y leads.
          </p>
        </div>
      </div>
    </footer>
  );
}
