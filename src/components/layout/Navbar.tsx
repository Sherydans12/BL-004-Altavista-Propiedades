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
        ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg bg-teal-800 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="text-white font-serif text-xl font-bold">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-teal-900 font-serif text-lg font-bold leading-tight tracking-tight">
                Altavista
              </span>
              <span className="text-[10px] text-amber-600 font-medium uppercase tracking-wider leading-none">
                Propiedades
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-teal-700 relative py-1 ${
                    isActive 
                      ? 'text-teal-900 font-semibold' 
                      : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </Link>
              );
            })}
            
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-teal-800 hover:bg-teal-900 shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-teal-800 hover:bg-slate-50 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg transition-all duration-300 ease-in-out transform ${
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
                    ? 'text-teal-900 bg-teal-50/50 font-semibold'
                    : 'text-slate-600 hover:text-teal-800 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-teal-800' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 px-3">
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium text-white bg-teal-800 hover:bg-teal-900 shadow-sm transition-colors"
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
