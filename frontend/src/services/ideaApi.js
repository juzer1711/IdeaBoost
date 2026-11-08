const errorMessages = {
  409: 'Has usado las 6 respuestas de esta conversación. Inicia una nueva conversación.',
  400: 'Revisa tu solicitud: escribe un tema de hasta 500 caracteres e inténtalo de nuevo.',
  403: 'No se pudo autorizar la conexión con el servicio de ideas.',
  429: 'El servicio alcanzó su límite temporal. Espera un momento y vuelve a intentarlo.',
  502: 'No se pudo completar la generación de ideas. Inténtalo de nuevo.',
  503: 'El servicio de ideas no está disponible en este momento. Inténtalo más tarde.',
  504: 'La generación tardó demasiado. Inténtalo de nuevo.',
}
const text = value => typeof value === 'string' && value.trim().length > 0

export function validateIdeaResponse(body) {
  const counts = { ideas: 3, follow_up: 1, clarification: 0, greeting: 0, out_of_scope: 0 }
  if (!body || typeof body.mode !== 'string' || !Object.hasOwn(counts, body.mode) || !text(body.intro) || !Array.isArray(body.ideas) || body.ideas.length !== counts[body.mode] ||
      !body.ideas.every(idea => idea && text(idea.title) && text(idea.description) && text(idea.firstStep))) {
    throw new Error('La respuesta recibida está incompleta. Inténtalo de nuevo.')
  }
  return {
    mode: body.mode,
    intro: body.intro,
    ideas: body.ideas.map(({ title, description, firstStep }) => ({ title, description, firstStep })),
  }
}

export async function generateIdeas({ message, history, signal }) {
  const baseUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, '')
  if (!baseUrl) throw new Error('Falta configurar la conexión con el backend. Revisa VITE_API_URL y reinicia el frontend.')
  let response
  try {
    response = await fetch(`${baseUrl}/api/ideas/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
      signal,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error('No pudimos conectar con el servicio de ideas. Comprueba tu conexión y vuelve a intentarlo.', { cause: error })
  }
  // Nunca mostramos el cuerpo crudo de un error del servidor.
  if (!response.ok) throw new Error(errorMessages[response.status] || 'No pudimos procesar tu solicitud. Inténtalo de nuevo.')
  let body
  try { body = await response.json() } catch {
    throw new Error('No se pudo leer la respuesta del servicio de ideas. Inténtalo de nuevo.')
  }
  return validateIdeaResponse(body)
}
