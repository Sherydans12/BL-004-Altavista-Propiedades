export interface ContactLeadPayload {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  preferredContactMethod?: 'telefono' | 'email' | 'whatsapp';
}

export interface OwnerLeadPayload {
  name: string;
  email: string;
  phone: string;
  operationIntent: 'venta' | 'arriendo' | 'ambos' | 'no_definido';
  propertyType: string;
  propertyComuna: string;
  propertyAddress?: string;
  estimatedPrice?: number;
  message?: string;
  preferredContactMethod?: 'telefono' | 'email' | 'whatsapp';
}
