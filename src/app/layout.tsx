import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Altavista Propiedades | Corredora Boutique y Gestión Inmobiliaria',
  description: 'Gestión inmobiliaria clara, cercana y profesional. Encuentra casas, departamentos, oficinas y terrenos en venta y arriendo en Santiago de Chile.',
  keywords: ['propiedades', 'venta de casas', 'arriendo de departamentos', 'corredora de propiedades', 'santiago', 'las condes', 'chile'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/50 text-slate-800 selection:bg-teal-100 selection:text-teal-900 font-sans">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
