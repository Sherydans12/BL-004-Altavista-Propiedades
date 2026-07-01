# Altavista Propiedades - Sitio Público Demo (BL-004)

Este repositorio contiene el sitio público de la corredora de propiedades ficticia **Altavista Propiedades**, diseñado específicamente como demostración del portal de cara al cliente y su integración directa con el SaaS principal **InmoDesk** (`BL-004-InmoDesk`).

## Propósito de la Demo

El objetivo de esta aplicación es mostrar el flujo completo de captación de interesados (Leads) y sincronización de propiedades desde el panel de administración:

1. **Administración de catálogo:** Se crea/publica una propiedad en el panel de administración de **InmoDesk** (corriendo en `http://localhost:3002`).
2. **Sincronización en tiempo real:** El portal de Altavista consume la API pública de InmoDesk y muestra la propiedad publicada.
3. **Conversión de Leads:** Un visitante ingresa sus datos en el formulario de interés de una propiedad específica.
4. **Ingreso al Pipeline de Ventas:** El lead se envía de forma inmediata al panel administrativo de InmoDesk mediante el endpoint `/api/public/demo/leads` asociando el `propertySlug`.
5. **Seguimiento comercial:** El lead ingresa al pipeline de ventas (etapa *Nuevo*) en InmoDesk listo para ser gestionado por un agente.

---

## Tecnologías Utilizadas

* **Framework:** Next.js (App Router) con soporte de Server Components.
* **Lenguaje:** TypeScript.
* **Estilos:** Tailwind CSS.
* **Iconografía:** Lucide React.
* **Modo Offline:** Cuenta con datos estáticos de respaldo (`FALLBACK_PROPERTIES`) en caso de que el servidor de InmoDesk no esté levantado, permitiendo presentar la interfaz en cualquier circunstancia.

---

## Requisitos Previos

1. Tener Node.js instalado (v18 o superior recomendado).
2. Tener clonado y corriendo el backend de **InmoDesk** en `http://localhost:3000` (o el puerto configurado).

---

## Configuración e Instalación

### 1. Variables de Entorno

Crea un archivo `.env` o `.env.local` en la raíz del proyecto (puedes tomar como referencia el archivo `.env.example`):

```bash
NEXT_PUBLIC_INMODESK_API_BASE_URL=http://localhost:3000
```

*Nota: Si no se define esta variable de entorno, la aplicación usará `http://localhost:3000` por defecto.*

### 2. Instalar dependencias

Ejecuta el siguiente comando para instalar las librerías necesarias:

```bash
npm install
```

### 3. Ejecutar en Modo Desarrollo

Levanta el servidor local en un puerto alternativo (por ejemplo, el puerto `3001` si InmoDesk ya está ocupando el puerto `3000` o `3002`):

```bash
npm run dev -- -p 3001
```

Abre tu navegador en [http://localhost:3001](http://localhost:3001) para ver la web pública.

---

## Guía de Demostración (Flujo Paso a Paso)

Sigue estos pasos en tu reunión de demostración para lucir la integración completa:

1. **Iniciar InmoDesk:** Levanta el panel de administración de InmoDesk en `http://localhost:3000` (o el puerto configurado).
2. **Levantar Altavista:** Levanta este sitio en el puerto `3001`.
3. **Verificar Conexión:** En la página de inicio de Altavista, confirma la aparición de la píldora verde `Conectado a InmoDesk API (Demo Live)`.
4. **Navegar Catálogo:** Dirígete a la sección `/propiedades` y corrobora que se listan las propiedades registradas en InmoDesk.
5. **Simular Interés:** Entra al detalle de cualquier propiedad (ej: `/propiedades/prop-1`) y completa el formulario "Me interesa esta propiedad".
6. **Enviar Lead:** Haz clic en "Contactar Agente". Deberías ver un banner verde de éxito confirmando el registro del lead.
7. **Verificar en InmoDesk:** Ve al panel administrativo de InmoDesk en la sección **Leads** o **Pipeline**. Comprueba que el nuevo lead que acabas de enviar aparece en tiempo real con su nombre, correo, teléfono y asociado a la propiedad correspondiente.
