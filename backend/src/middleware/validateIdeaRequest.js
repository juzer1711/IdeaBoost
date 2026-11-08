const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)
export function validateIdeaRequest(req, res, next) {
  const reject = error => res.status(400).json({ error })
  if (!isObject(req.body)) return reject('Envía un objeto JSON con el campo message.')
  const { message, history = [] } = req.body
  if (typeof message !== 'string') return reject('El mensaje es obligatorio y debe ser texto.')
  const trimmed = message.trim()
  if (!trimmed) return reject('Escribe un tema o una necesidad para generar ideas.')
  if (trimmed.length > 500) return reject('El mensaje no puede superar los 500 caracteres.')
  if (!Array.isArray(history) || history.length > 12) return reject('El historial debe ser una lista de hasta 12 mensajes.')
  const cleanHistory = []
  for (const entry of history) {
    if (!isObject(entry) || !['user', 'assistant'].includes(entry.role) ||
        typeof entry.content !== 'string' || !entry.content.trim() || entry.content.trim().length > 2000) {
      return reject('Cada mensaje del historial debe tener role user o assistant y content de texto entre 1 y 2000 caracteres.')
    }
    cleanHistory.push({ role: entry.role, content: entry.content.trim() })
  }
  if (cleanHistory.filter(entry => entry.role === 'assistant').length >= 6) {
    return res.status(409).json({ error: 'Has usado las 6 respuestas de esta conversación. Inicia una nueva conversación.' })
  }
  req.ideaRequest = { message: trimmed, history: cleanHistory }
  next()
}
