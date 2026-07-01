import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPropertyBySlug } from '@/lib/inmodesk-api';
import { FALLBACK_PROPERTIES } from '@/lib/fallback-data';
import PropertyDetailClient from '@/components/properties/PropertyDetailClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let property = null;

  try {
    property = await fetchPropertyBySlug(slug);
  } catch {
    // Check fallback properties offline
    property = FALLBACK_PROPERTIES.find(p => p.slug === slug) || null;
  }

  if (!property) {
    return {
      title: 'Propiedad No Encontrada | Altavista Propiedades',
      description: 'La propiedad solicitada no existe o no está disponible.',
    };
  }

  return {
    title: `${property.title} | Altavista Propiedades`,
    description: `${property.description.slice(0, 160)}...`,
  };
}

export default async function PropiedadDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let property = null;
  let isOffline = false;

  try {
    property = await fetchPropertyBySlug(slug);
  } catch (error) {
    console.warn(`Error fetching details for slug '${slug}'. Trying fallback.`, error);
    isOffline = true;
    property = FALLBACK_PROPERTIES.find(p => p.slug === slug) || null;
  }

  // If no property is found in both API and fallback data
  if (!property) {
    notFound();
  }

  return (
    <PropertyDetailClient 
      property={property} 
      isOffline={isOffline} 
    />
  );
}
