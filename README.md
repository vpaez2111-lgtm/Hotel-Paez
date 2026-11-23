# Hotel Páez — sitio web

Landing page estática de concepto para un hotel retrofuturista en Cartagena de Indias.

## Archivos
- `index.html`: sitio completo, responsive, con catálogo de habitaciones, formulario de solicitud de reserva, acceso a WhatsApp y concierge FAQ de demostración.

## Inventario conceptual
- 40 King Room — 1 cama King.
- 40 Double Queen — 2 camas Queen.
- 20 Future Suite — suite con cama King.
- Total: 100 habitaciones.

## Tarifas de referencia (COP por habitación/noche)
- King Room: $589.000
- Double Queen: $649.000
- Future Suite: $899.000

Son precios iniciales de diseño, no tarifas confirmadas del establecimiento. Se contrastaron con precios públicos visibles de hoteles en Cartagena; pueden variar por fecha, ocupación, impuestos, desayuno y políticas. Antes de aceptar reservas, administración debe validar tarifas, impuestos, inventario y servicios incluidos.

Referencias de mercado consultadas:
- Sonesta Cartagena: https://www.sonestacartagena.com/es/habitaciones/
- Hilton Cartagena: https://www.hilton.com/
- Hotel Dann Cartagena: https://www.hoteldanncartagena.com/reservas

## Pendientes antes de producción
1. Configurar el número oficial de WhatsApp con código de país en el enlace `wa.me`. Actualmente el botón abre WhatsApp con el mensaje prellenado, pero no dirige a un número específico.
2. Confirmar dirección, teléfono, correo, RNT, políticas, impuestos y servicios reales del hotel.
3. El concierge incluido es un prototipo de respuestas frecuentes en el navegador; no es todavía un modelo de IA ni está conectado a disponibilidad o reservas. Para IA real se necesita un backend seguro y una API de modelo (la clave nunca debe ponerse en el JavaScript público).
4. Reemplazar las fotografías de muestra por fotografías propias/licenciadas y confirmar derechos de uso.
5. Validar accesibilidad, SEO, analítica y pruebas de reserva antes del lanzamiento comercial.

## Publicar con GitHub Pages
En el repositorio, abre **Settings → Pages**, elige **Deploy from a branch**, selecciona la rama **main** y la carpeta **/(root)**, y guarda. GitHub publicará el sitio en la URL Pages que muestre la configuración del repositorio.
