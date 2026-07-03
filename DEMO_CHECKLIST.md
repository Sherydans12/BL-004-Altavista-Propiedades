# Lista de Chequeo Pre-Reunión (Control de Demo) — Altavista Propiedades

Esta lista de chequeo debe ser completada **30 minutos antes** de cada demostración comercial pública para asegurar que los servicios críticos, flujos funcionales y contingencias estén perfectamente preparados.

---

## 1. Chequeo de Salud de la Infraestructura (Health Check)
- [ ] **Acceso a API Base (InmoDesk):** 
  - Abrir en navegador: `https://inmodesk-demo.baselogic.cl/api/public/demo/properties`
  - Validar que devuelva un arreglo JSON con las propiedades de prueba sin errores 500 o fallos de certificado SSL.
- [ ] **Acceso a Frontend Público (Altavista):**
  - Entrar a: `https://altavista-demo.baselogic.cl`
  - Validar que el sitio cargue en menos de 3 segundos, muestre certificado SSL seguro (HTTPS) y no tenga alertas de consola críticas (F12).
- [ ] **Variables de Entorno (Production Build):**
  - Asegurar que `NEXT_PUBLIC_INMODESK_API_BASE_URL` esté configurado exactamente como `https://inmodesk-demo.baselogic.cl` en el hosting (Coolify).

---

## 2. Chequeo de Flujos Funcionales (Functional Check)
- [ ] **Flujo 1: Lead por Propiedad Específica**
  - Entrar al detalle de una propiedad, rellenar el formulario lateral de interés con datos ficticios (ej: `test-lead@altavista.cl`).
  - Hacer clic en enviar. Verificar banner de éxito: *"¡Mensaje enviado con éxito! Tu consulta fue recibida. Un asesor de Altavista te contactará pronto."*
  - Ir a InmoDesk (`https://inmodesk-demo.baselogic.cl/admin`), autenticarse y verificar en la sección **Leads** y **Pipeline** que el lead ingresó en tiempo real y está asociado a la propiedad correcta.
- [ ] **Flujo 2: Contacto General**
  - Ir a `/contacto`, llenar el formulario de contacto y enviarlo.
  - Verificar banner de éxito: *"Tu consulta fue recibida. Un asesor de Altavista te contactará pronto."*
  - Verificar en InmoDesk (Sección **Leads** / tipo contacto) que el lead fue creado.
- [ ] **Flujo 3: Captación de Propietario**
  - Ir a `/publica-con-nosotros`, hacer scroll hasta el final, completar el formulario de captación y enviarlo.
  - Verificar banner de éxito: *"¡Datos recibidos con éxito! Recibimos los datos de tu propiedad. Un asesor evaluará la información y te contactará."*
  - Verificar en InmoDesk (Sección **Leads** / tipo propietario) que los campos ingresados (Comuna, Tipo de Propiedad, Precio Estimado) estén completos y visibles.

---

## 3. Plan B: Contingencia ante Caída de API (Offline Fallback)
En caso de que el backend de **InmoDesk** experimente una interrupción o latencia crítica durante la llamada comercial en vivo:
1. **Detección Automática:** El frontend de Altavista no se romperá ni mostrará una pantalla en blanco. Está diseñado con resiliencia incorporada para capturar errores de red durante las llamadas al servidor.
2. **Catálogo Referencial:** El sitio cambiará de forma transparente al uso de los datos estáticos de respaldo (`FALLBACK_PROPERTIES`).
3. **Banner Comercial no Técnico:** Se mostrará un sutil indicador con el texto: *"Mostrando catálogo referencial"* en color ámbar en lugar de mensajes técnicos como "Modo offline" o "Error de conexión con InmoDesk".
4. **Formularios con Redirección Resiliente:** Si el cliente intenta enviar un formulario mientras la API está caída:
   - Se mostrará el banner de error: *"No pudimos enviar tu consulta. Intenta nuevamente en unos minutos o contáctanos por WhatsApp."*
   - **Acción del Presentador:** Utilizar este error para destacar la resiliencia técnica de la plataforma y pivotar suavemente haciendo clic en el botón de WhatsApp (u ofreciendo enviar los datos directamente por esa vía), lo que demuestra que el canal comercial de Altavista siempre mantiene alternativas de comunicación operativas.
