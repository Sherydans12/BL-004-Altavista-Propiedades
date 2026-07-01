import { Property, LeadInput } from '@/types/property';

const API_BASE_URL = process.env.NEXT_PUBLIC_INMODESK_API_BASE_URL || 'http://localhost:3000';

export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(`${API_BASE_URL}/api/public/demo/properties`, {
    cache: 'no-store' // Avoid caching to ensure we can show instant changes in live demo
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchPropertyBySlug(slug: string): Promise<Property | null> {
  const res = await fetch(`${API_BASE_URL}/api/public/demo/properties/${slug}`, {
    cache: 'no-store' // Avoid caching to ensure we can show instant changes in live demo
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch property ${slug}: ${res.statusText}`);
  }
  return res.json();
}

export async function submitLead(lead: LeadInput): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/demo/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        propertySlug: lead.propertySlug,
        message: lead.message || 'Interesado en la propiedad',
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Ocurrió un error al enviar el formulario.' };
    }
    return { success: true };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Error de conexión con el servidor.';
    return { success: false, error: errMessage };
  }
}
