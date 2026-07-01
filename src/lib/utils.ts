export function formatCLP(val: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);
}

export function formatUF(val: number): string {
  const formatted = new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(val);
  return `UF ${formatted}`;
}

export function formatArea(val: number): string {
  return `${val} m²`;
}
