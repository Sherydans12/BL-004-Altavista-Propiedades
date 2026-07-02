# Guía de Despliegue en Coolify — Altavista Propiedades (BL-004)

Este documento detalla la configuración y los parámetros necesarios para desplegar **Altavista Propiedades** en Coolify de forma exitosa usando un Dockerfile explícito.

## Configuración del Despliegue en Coolify

Para dar de alta esta aplicación en Coolify, utiliza los siguientes parámetros:

* **Dominio:** `https://altavista-demo.baselogic.cl`
* **Build Pack:** `Dockerfile`
* **Dockerfile Path:** `./Dockerfile`
* **Puerto:** `3000`

## Variables de Entorno

Debes configurar la siguiente variable de entorno en la sección **Variables de Entorno (Environment Variables)** de Coolify:

| Variable | Valor Recomendado | Ámbito (Scope) | Descripción |
|---|---|---|---|
| `NEXT_PUBLIC_INMODESK_API_BASE_URL` | `https://inmodesk-demo.baselogic.cl` | Build-time | URL base de la API de producción de InmoDesk |
| `NODE_ENV` | `production` | Runtime / Build-time | Entorno de producción |

> [!IMPORTANT]
> **Inyección en Build-Time:**
> En Next.js, las variables que tienen el prefijo `NEXT_PUBLIC_` se compilan directamente en el código de cliente en el momento del build (`npm run build`).
> Por lo tanto, si cambias el valor de `NEXT_PUBLIC_INMODESK_API_BASE_URL` en Coolify, **debes forzar un nuevo deploy / rebuild** de la aplicación para que los cambios surtan efecto en el portal.
