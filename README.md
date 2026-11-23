# Hotel Páez — sitio web

Landing page estática de concepto para un hotel retrofuturista en Cartagena de Indias, con un endpoint serverless para el concierge de IA.

## Archivos
- `index.html`: sitio responsive, catálogo, solicitud de reserva, WhatsApp y chat.
- `api/chat.js`: backend serverless que consulta la API de OpenAI sin exponer la clave al navegador.
- `vercel.json`: configuración de la función serverless.

## Inventario conceptual
- 40 King Room — 1 cama King.
- 40 Double Queen — 2 camas Queen.
- 20 Future Suite — suite con cama King.
- Total: 100 habitaciones.

## Tarifas de referencia (COP por habitación/noche)
- King Room: $589.000
- Double Queen: $649.000
- Future Suite: $899.000

Son precios iniciales de diseño, no tarifas confirmadas del establecimiento. Deben validarse con administración y ajustarse por temporada, impuestos, ocupación y servicios incluidos.

## WhatsApp
El sitio usa el número configurado por el propietario: `111222333444` (formato internacional sin signos ni espacios). Confirma que sea un número real, con código de país y activo en WhatsApp antes de anunciar el sitio.

## Activar el concierge de IA en producción

GitHub Pages solo publica archivos estáticos y no ejecuta `api/chat.js`. Para que el concierge funcione, despliega este repositorio en Vercel:

1. Entra a https://vercel.com/ e inicia sesión.
2. Selecciona **Add New → Project** y conecta GitHub.
3. Importa `vpaez2111-lgtm/Hotel-Paez`.
4. En **Project Settings → Environment Variables**, agrega:
   - Name: `OPENAI_API_KEY`
   - Value: tu clave secreta de OpenAI API.
   - Environment: Production (y Preview si deseas probar previews).
5. Opcional: agrega `OPENAI_MODEL` con un modelo habilitado en tu proyecto de API. Si no lo agregas, el endpoint usa `gpt-6.2-astra`.
6. Pulsa **Deploy**. Después de añadir o cambiar variables, vuelve a desplegar.
7. Abre la URL `.vercel.app` que entrega Vercel y prueba el concierge.

**Seguridad:** nunca pongas la clave en `index.html`, en variables públicas como `NEXT_PUBLIC_*`, ni en el repositorio. La clave se mantiene en el entorno del servidor Vercel. El uso de la API puede generar costos en la cuenta de OpenAI.

El concierge responde con información de habitaciones y tarifas de referencia. No tiene acceso a inventario, reservas, pagos ni datos operativos reales; no puede confirmar disponibilidad ni reservas.

## Pendientes antes de producción
1. Validar que el WhatsApp indicado sea el número correcto y tenga código de país.
2. Confirmar dirección, teléfono, correo, RNT, políticas, impuestos y servicios reales del hotel.
3. Conectar motor de reservas/inventario si se requiere disponibilidad en tiempo real.
4. Reemplazar las fotografías de muestra por fotografías propias/licenciadas y confirmar derechos de uso.
5. Añadir límites de uso, protección antiabuso y monitoreo del endpoint antes de una campaña pública.
6. Probar accesibilidad, SEO, analítica y flujos de reserva en móvil y escritorio.

## Referencia técnica
- OpenAI API Quickstart: https://developers.openai.com/api/docs/quickstart
- OpenAI API Authentication: https://developers.openai.com/api/reference/overview
- Vercel Functions: https://vercel.com/docs/functions
