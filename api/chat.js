// Vercel serverless endpoint for Hotel Páez Concierge.
// Configure OPENAI_API_KEY in Vercel Project Settings > Environment Variables.
// Never place API credentials in browser code or commit them to this repository.

const HOTEL_CONTEXT = `
Eres Concierge Páez, el asistente virtual de Hotel Páez, un concepto de hotel retrofuturista en Cartagena de Indias, Colombia.
Habla siempre en español, con tono cálido, profesional, breve y servicial.
Información confirmada para este prototipo:
- 100 habitaciones en total.
- 40 King Room: una cama King; tarifa de referencia $589.000 COP por habitación/noche.
- 40 Double Queen: dos camas Queen; tarifa de referencia $649.000 COP por habitación/noche.
- 20 Future Suite: suite con cama King y sala independiente; tarifa de referencia $899.000 COP por habitación/noche.
- Las tarifas son orientativas y no garantizan disponibilidad. Pueden cambiar según fechas, temporada, impuestos y condiciones.
- El hotel se presenta como ubicado en Cartagena de Indias, pero no hay dirección exacta confirmada.
- No hay inventario conectado, motor de reservas, confirmación de pagos ni datos confirmados de desayuno, piscina, parqueadero, accesibilidad, mascotas, políticas o servicios adicionales.
Reglas:
- Nunca inventes dirección, disponibilidad, confirmaciones, servicios, promociones, políticas ni precios distintos a los indicados.
- Si preguntan por datos no confirmados, dilo claramente y ofrece continuar por WhatsApp para validación con el equipo.
- No digas que has reservado una habitación ni que una reserva está confirmada.
- Ayuda a comparar las tres habitaciones y recopila fechas, huéspedes y preferencia solo para orientar la consulta.
- No solicites datos de tarjetas, contraseñas ni documentos sensibles.
- Si la consulta requiere intervención humana, indica que pueden usar el botón de WhatsApp del sitio.
`;

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: "El concierge está pendiente de configuración. Por favor, contáctanos por WhatsApp."
    });
  }

  try {
    const body = req.body || {};
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const safeMessages = messages
      .slice(-10)
      .filter((item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string"
      )
      .map((item) => ({
        role: item.role,
        content: item.content.slice(0, 1500)
      }));

    if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== "user") {
      return res.status(400).json({ error: "Escribe una pregunta para iniciar la conversación." });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6.2-astra",
        instructions: HOTEL_CONTEXT,
        input: safeMessages,
        max_output_tokens: 350,
        store: false
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI API error:", response.status, data && data.error ? data.error.type : "unknown");
      return res.status(502).json({
        error: "No pude responder en este momento. Inténtalo de nuevo o contáctanos por WhatsApp."
      });
    }

    const answer = typeof data.output_text === "string"
      ? data.output_text
      : (data.output || [])
          .flatMap((item) => item.content || [])
          .filter((part) => part.type === "output_text")
          .map((part) => part.text)
          .join("\n");

    if (!answer) {
      return res.status(502).json({ error: "No recibí una respuesta. Inténtalo nuevamente." });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Concierge endpoint error:", error && error.message ? error.message : "unknown");
    return res.status(500).json({
      error: "Ocurrió un inconveniente. Inténtalo nuevamente o escríbenos por WhatsApp."
    });
  }
};
