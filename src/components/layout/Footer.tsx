import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep texture-grain text-[#f7f0e6] border-t border-[#d8c7a3]/15">
      <div className="editorial-container relative py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[#d8c7a3]/40 bg-white/8 shadow-md">
                <span className="text-[#f7f0e6] font-serif text-2xl font-bold">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#f7f0e6] font-serif text-xl font-bold leading-tight tracking-tight">
                  Altavista
                </span>
                <span className="text-[10px] text-[#d8c7a3] font-semibold uppercase tracking-[0.28em] leading-none">
                  Propiedades
                </span>
              </div>
            </Link>
            <p className="max-w-md font-serif text-2xl leading-snug text-[#f7f0e6]">
              Corretaje boutique para propiedades que merecen una presentación cuidada y una gestión cercana.
            </p>
            <p className="max-w-sm text-sm font-light leading-relaxed text-[#efe7d8]/72">
              Santiago, barrios consolidados y una mirada comercial que privilegia claridad, calidez y seguimiento real.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c7a3] mb-5">
              Nuestra Web
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#d8c7a3] transition-colors flex items-center group">
                  Inicio
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/propiedades" className="hover:text-[#d8c7a3] transition-colors flex items-center group">
                  Propiedades
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/publica-con-nosotros" className="hover:text-[#d8c7a3] transition-colors flex items-center group">
                  Publica con nosotros
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-[#d8c7a3] transition-colors flex items-center group">
                  Contacto
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c7a3] mb-5">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#c89b3c] mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-[#efe7d8]/82">Av. Apoquindo 3200, Las Condes, Santiago</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[#c89b3c] mr-3 flex-shrink-0" />
                <a href="tel:+56987654321" className="text-[#efe7d8]/82 hover:text-white transition-colors">
                  +56 9 8765 4321
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[#c89b3c] mr-3 flex-shrink-0" />
                <a href="mailto:contacto@altavistapropiedades.cl" className="text-[#efe7d8]/82 hover:text-white transition-colors break-all">
                  contacto@altavistapropiedades.cl
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c7a3] mb-5">
              Síguenos
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://instagram.com/altavistapropiedades"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#d8c7a3]/20 bg-white/6 hover:bg-[#b77946] transition-colors flex items-center justify-center text-[#efe7d8] hover:text-white"
                aria-label="Instagram Altavista Propiedades"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#d8c7a3]/20 bg-white/6 hover:bg-[#b77946] transition-colors flex items-center justify-center text-[#efe7d8] hover:text-white"
                aria-label="LinkedIn Altavista Propiedades"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-[#efe7d8]/55 font-light leading-relaxed">
              Corredora boutique de Santiago.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#d8c7a3]/15 flex flex-col md:flex-row justify-between items-center text-xs text-[#efe7d8]/52 gap-2">
          <p>&copy; {currentYear} Altavista Propiedades. Todos los derechos reservados.</p>
          <p className="font-medium">
            Servicio integral y asesoría personalizada.
          </p>
        </div>
      </div>
    </footer>
  );
}
