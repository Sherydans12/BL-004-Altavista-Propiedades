# Altavista Propiedades - Sitio Público Demo (BL-004)

Este repositorio contiene el sitio público de la corredora de propiedades ficticia **Altavista Propiedades**, diseñado específicamente como demostración del portal de cara al cliente y su integración directa con el SaaS principal **InmoDesk** (`BL-004-InmoDesk`).

> [!IMPORTANT]
> **Este repositorio NO es el SaaS principal.** El SaaS principal, que incluye el panel de administración, el pipeline de ventas, la agenda y el gestor de propiedades, se encuentra en el repositorio independiente [Sherydans12/BL-004-InmoDesk](https://github.com/Sherydans12/BL-004-InmoDesk).

---

## Relación con BL-004 InmoDesk

Este sitio consume la API pública del repo BL-004-InmoDesk:

- `GET /api/public/demo/properties`: Listado de propiedades públicas y publicadas.
- `GET /api/public/demo/properties/[slug]`: Detalle individual de una propiedad pública resolviendo por su slug.
- `POST /api/public/demo/leads`: Envío de datos del formulario de contacto de una propiedad para registrar un lead en el CRM.

---

## Estado de la Integración

### Conectado Realmente:
* **Catálogo de Propiedades (`/propiedades`)**: Consulta dinámicamente el listado de propiedades publicadas directamente de la base de datos local de InmoDesk.
* **Detalle de Propiedad (`/propiedades/[slug]`)**: Resuelve la propiedad por su slug de forma dinámica contra el CRM.
* **Formulario de Interés (Leads)**: Al completar el formulario de contacto en el detalle de una propiedad, el payload se envía vía POST a InmoDesk, guardándolo en la base de datos del CRM (`db.json`) y asociando el lead a la propiedad correcta en estado `nuevo`.

### Simulado / En el Cliente:
* **Formulario de Publicación (`/publica-con-nosotros`)**: El formulario para captar nuevos propietarios se procesa en el cliente y muestra un mensaje de éxito simulado, ya que el CRM de InmoDesk no expone actualmente un endpoint público de registro de propietarios.
* **Formulario de Contacto General (`/contacto`)**: Simula el envío exitoso de la consulta al cliente.
* **Modo Offline**: Si el servidor de InmoDesk no está encendido o devuelve un error, el portal de Altavista entra automáticamente en modo resiliente. Despliega un badge indicativo en la Navbar (*"Usando datos de respaldo offline"*) y carga la información local desde `src/lib/fallback-data.ts`. El envío de leads en este modo notificará al usuario el fallo de conexión con el servidor.

---

## Stack de Tecnologías

* **Core Framework:** Next.js 16 (App Router)
* **React:** Versión 19
* **Styling (CSS):** Tailwind CSS v4.0 (con `@tailwindcss/postcss`)
* **TypeScript:** Versión 5.0
* **Iconografía:** Lucide React (^0.468.0)

---

## Configuración y Variables de Entorno

Para conectar el sitio con InmoDesk, debes configurar la URL base de la API. Crea un archivo `.env` o `.env.local` en la raíz del proyecto basándote en `.env.example`:

```env
# URL base del Admin Panel / API pública de BL-004 InmoDesk
# En demo local normalmente debe quedar en http://localhost:3000
NEXT_PUBLIC_INMODESK_API_BASE_URL=http://localhost:3000
```

*Nota: Si no se define esta variable, la aplicación asume por defecto `http://localhost:3000`.*

---

## Cómo Instalar y Ejecutar en Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar el servidor local**:
   Debido a posibles conflictos de puerto con InmoDesk (que corre por defecto en `3000`) y otras apps locales (como BL-002 en `3001`), se recomienda ejecutar Altavista en el puerto `3005` (u otro puerto libre):
   ```bash
   npm run dev -- -p 3005
   ```

3. **Verificación en el navegador**:
   Abre [http://localhost:3005](http://localhost:3005) para acceder a la web de Altavista Propiedades.
