# DEMO RUNBOOK — Altavista Propiedades + InmoDesk

Esta guía describe el paso a paso detallado para configurar, ejecutar y presentar el flujo completo de la demo local integrada entre el portal público **Altavista Propiedades** y el panel de administración **InmoDesk (CRM)** durante una reunión comercial.

---

## 1. Levantar InmoDesk

Desde la carpeta del repositorio de InmoDesk (que debe ser una carpeta hermana a este proyecto):

1. Abre una terminal y sitúate en el directorio de InmoDesk:
   ```bash
   cd ../BL-004-InmoDesk
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. El panel administrativo de InmoDesk debe quedar levantado en la URL por defecto:
   ```txt
   http://localhost:3000
   ```

### Credenciales Demo de InmoDesk:
Para iniciar sesión en el CRM y ver la gestión comercial de leads:
* **Email:** `sofia.valdes@inmodesk.cl`
* **Contraseña:** `inmodesk2026`

---

## 2. Levantar Altavista Propiedades

Desde la carpeta raíz del proyecto **BL-004-Altavista-Propiedades**:

1. Abre una terminal en este directorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor local. Debido a que InmoDesk ya ocupa el puerto `3000` y otros servicios pueden ocupar el puerto `3001` o `3002`, levanta el portal público en el puerto `3005`:
   ```bash
   npm run dev -- -p 3005
   ```
4. El portal debe quedar activo en:
   ```txt
   http://localhost:3005
   ```

---

## 3. Verificar Conexión de API

Antes de iniciar la reunión, corrobora la conectividad haciendo las siguientes consultas rápidas:

1. **Prueba API Directa**: Abre [http://localhost:3000/api/public/demo/properties](http://localhost:3000/api/public/demo/properties) en tu navegador. Debe devolver un arreglo JSON con las propiedades activas.
2. **Prueba del Portal**: Abre [http://localhost:3005/propiedades](http://localhost:3005/propiedades). En la cabecera (Navbar) debe aparecer un badge verde indicando **"InmoDesk API Live"**. Si se visualiza el banner *"InmoDesk API offline / Usando datos de respaldo offline"*, significa que Altavista no está logrando establecer contacto con la dirección configurada en las variables de entorno.

---

## 4. Flujo Comercial a Mostrar en Reunión

Sigue esta secuencia para demostrar el valor integrado del ecosistema:

1. **Revisar Propiedades en InmoDesk**:
   * Entra a [http://localhost:3000](http://localhost:3000), inicia sesión con las credenciales demo.
   * Ve a la sección **Propiedades**. Identifica una propiedad publicada (por ejemplo: *"Moderna Casa en San Damián"*). Explicar al cliente cómo se administra el portafolio de manera interna.
2. **Navegar en Altavista**:
   * Abre [http://localhost:3005](http://localhost:3005) y destaca la estética de lujo del sitio público.
   * Haz clic en **Propiedades** para cargar el catálogo.
3. **Generar un Lead**:
   * Entra al detalle de la propiedad *"Moderna Casa en San Damián"* (`/propiedades/casa-moderna-las-condes-san-damian`).
   * Rellena el formulario de interés de la derecha con un nombre llamativo (ej. *"Comprador Demo Reunión"*), correo y teléfono.
   * Presiona **Contactar Agente**. El botón mostrará un spinner y luego aparecerá el banner de éxito.
4. **Verificar Ingreso de Lead**:
   * Regresa al panel de administración de **InmoDesk** (`http://localhost:3000`).
   * Navega a la pestaña de **Leads** para mostrar que el contacto ingresó en tiempo real con su nombre, correo, teléfono e información de interés, y que está enlazado a la propiedad correcta.
   * Navega a la pestaña de **Pipeline** y destaca cómo el lead se posicionó automáticamente en la etapa de *Nuevo* dentro del tablero Kanban comercial, listo para iniciar la gestión de corretaje.

### Flujo adicional — Consulta general

1. Ir a `/contacto`.
2. Completar el formulario (Nombre, Email, Teléfono, Asunto/Motivo, Mensaje, Método preferido de contacto).
3. Enviar.
4. Volver al panel de administración de **InmoDesk** (`http://localhost:3000`).
5. Confirmar que el lead ingresó y aparece como "Contacto general" (o con la información correspondiente) en la pestaña **Leads**.
6. Confirmar que aparece en la columna *Nuevo* del **Pipeline**.

### Flujo adicional — Captación de propietario

1. Ir a `/publica-con-nosotros`.
2. Completar el formulario con los datos de tu propiedad (Nombre, Email, Teléfono, Qué quiere hacer, Tipo de propiedad, Comuna, Dirección/Sector, Precio estimado, Mensaje, Método preferido).
3. Enviar.
4. Volver al panel de administración de **InmoDesk** (`http://localhost:3000`).
5. Confirmar que la solicitud de propietario ingresó y aparece como "Propietario" o "Captación propietario" en la pestaña **Leads**.
6. Confirmar que aparece en la columna *Nuevo* del **Pipeline**.

---

## 5. Riesgos Conocidos y Mitigaciones

* **Conflicto de Puertos**: Si el puerto `3000` está ocupado por otra aplicación al iniciar InmoDesk, Next.js se levantará automáticamente en otro puerto libre (ej. `3002`). Si esto ocurre, Altavista no se conectará y usará fallback offline.
  * *Solución:* Asegúrate de apagar cualquier proceso en el puerto `3000` antes de iniciar la demo. Puedes matar procesos en puerto 3000 con `Stop-Process -Id <PID>` o usando PowerShell.
* **API InmoDesk Desconectada**: Si InmoDesk se cae, Altavista muestra las propiedades simuladas de `src/lib/fallback-data.ts`. La interfaz sigue luciendo premium, pero el envío de formularios arrojará un error de conexión.
  * *Solución:* Sigue el checklist previo a la reunión para garantizar que ambos servidores estén activos.
* **Dependencia de la API Local**: Los formularios de contacto, captación y leads por propiedad dependen de que InmoDesk esté corriendo activamente en `localhost:3000`.
  * *Solución:* Realiza el checklist de control previo antes de comenzar la reunión comercial.

---

## 6. Checklist de Control (Antes de Empezar - Local)

* [ ] InmoDesk iniciado y escuchando activamente en `http://localhost:3000`.
* [ ] Altavista Propiedades iniciado y escuchando en `http://localhost:3005`.
* [ ] El endpoint `http://localhost:3000/api/public/demo/properties` responde con JSON.
* [ ] El Navbar de Altavista muestra el indicador verde **"InmoDesk API Live"** (sin banners de advertencia de offline).
* [ ] Se realiza una prueba previa de envío de lead en Altavista y se confirma su aparición en el tablero Pipeline de InmoDesk.

---

## 7. Despliegue y Checklist de Control en Producción (Coolify)

Para validar el ecosistema en producción (desplegado en Coolify):

### Direcciones de Producción:
* **InmoDesk producción:** [https://inmodesk-demo.baselogic.cl](https://inmodesk-demo.baselogic.cl)
* **Altavista producción:** [https://altavista-demo.baselogic.cl](https://altavista-demo.baselogic.cl)

### Checklist de Validación en Producción:
* [ ] 1. Abrir **Altavista producción** (`https://altavista-demo.baselogic.cl`).
* [ ] 2. Ir a `/propiedades`.
* [ ] 3. Confirmar que carga propiedades desde **InmoDesk producción** (Navbar indica **"InmoDesk API Live"**).
* [ ] 4. Abrir el detalle de una propiedad.
* [ ] 5. Enviar un lead por propiedad a través del formulario de contacto.
* [ ] 6. Iniciar sesión en **InmoDesk producción** e ir a la sección **Leads** para confirmar que el lead se registró correctamente.
* [ ] 7. Ir a la sección **Pipeline** en InmoDesk producción y confirmar que el lead aparece en la etapa *Nuevo* en el tablero Kanban.
* [ ] 8. Probar el formulario de contacto general en `/contacto` y verificar que el lead correspondiente se registre en InmoDesk.
* [ ] 9. Probar el formulario de captación de propietarios en `/publica-con-nosotros` y verificar que el lead correspondiente se registre en InmoDesk.

