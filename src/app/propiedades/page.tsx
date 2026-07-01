import React from 'react';
import { fetchProperties } from '@/lib/inmodesk-api';
import { FALLBACK_PROPERTIES } from '@/lib/fallback-data';
import PropertiesListClient from '@/components/properties/PropertiesListClient';

// Disable next.js static rendering cache to ensure live demo works flawlessly
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PropiedadesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = JSON.stringify(params);

  let properties = [];
  let isOffline = false;

  try {
    const rawProperties = await fetchProperties();
    // Filter only published properties
    properties = rawProperties.filter(p => p.isPublished);
  } catch (error) {
    console.warn("InmoDesk API offline during properties listing fetch. Using fallback data.", error);
    isOffline = true;
    properties = FALLBACK_PROPERTIES;
  }

  return (
    <PropertiesListClient 
      key={key}
      initialProperties={properties} 
      isOffline={isOffline} 
    />
  );
}
