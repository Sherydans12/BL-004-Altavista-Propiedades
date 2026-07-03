'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Phone, Building2, MessageSquare, Compass } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/propiedades', label: 'Propiedades', icon: Building2 },
    { href: '/publica-con-nosotros', label: 'Publica con nosotros', icon: Compass },
    { href: '/contacto', label: 'Contacto', icon: MessageSquare },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#f7f0e6]/90 backdrop-blur-xl shadow-sm border-b border-[#b8aa94]/30 py-3' 
        : 'bg-[#102a2a]/82 backdrop-blur-xl border-b border-[#f4efe6]/10 py-4 md:py-5'
    }`}>
      <div className="editorial-container">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Altavista Propiedades">
            <div className={`relative grid h-11 w-11 place-items-center rounded-full border transition-transform group-hover:scale-105 ${
              scrolled ? 'border-[#b77946]/35 bg-[#102a2a] text-[#f7f0e6]' : 'border-[#d8c7a3]/45 bg-[#f4efe6]/12 text-[#f7f0e6]'
            }`}>
              <span className="font-serif text-xl font-bold leading-none">A</span>
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-[#c89b3c]" />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg font-bold leading-tight tracking-tight ${
                scrolled ? 'text-[#0f3d3e]' : 'text-[#f7f0e6]'
              }`}>
                Altavista
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-[0.24em] leading-none ${
                scrolled ? 'text-[#b77946]' : 'text-[#d8c7a3]'
              }`}>
                Propiedades
              </span>
            </div>
          </Link>

          <div className={`hidden md:flex items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-xl ${
            scrolled ? 'border-[#b8aa94]/35 bg-white/35' : 'border-[#f4efe6]/20 bg-[#102a2a]/45'
          }`}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#b77946] text-white shadow-sm' 
                      : scrolled
                        ? 'text-[#5f6b65] hover:text-[#0f3d3e]'
                        : 'text-[#f7f0e6]/78 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              href="/contacto"
              className="btn-copper px-4 py-2.5"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contacto
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              className={`inline-flex items-center justify-center p-2 rounded-full border transition-colors ${
                scrolled
                  ? 'text-[#0f3d3e] border-[#b8aa94]/45 hover:bg-[#efe7d8]'
                  : 'text-[#f7f0e6] border-[#f4efe6]/25 hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute top-full left-0 right-0 bg-[#f7f0e6]/95 backdrop-blur-xl border-b border-[#b8aa94]/30 shadow-lg transition-all duration-300 ease-in-out transform ${
        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
      }`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-[#0f3d3e] font-semibold'
                    : 'text-[#5f6b65] hover:text-[#0f3d3e] hover:bg-[#efe7d8]'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-[#d8c7a3]' : 'text-[#8a9a87]'}`} />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 px-3">
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className="btn-primary flex w-full"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llámanos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
