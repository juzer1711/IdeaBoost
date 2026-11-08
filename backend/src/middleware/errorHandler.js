// Express identifica un middleware de errores por sus cuatro argumentos.
export function errorHandler(error, _req, res, _next) {
  if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'El cuerpo de la solicitud debe ser JSON válido.' })
  if (error.type === 'entity.too.large') return res.status(413).json({ error: 'La solicitud es demasiado grande.' })
  if (error.type === 'charset.unsupported' || error.type === 'encoding.unsupported') {
    return res.status(415).json({ error: 'Usa JSON con codificación UTF-8.' })
  }
  const messages = {
    403: 'Este origen no está permitido.',
    429: 'El servicio de ideas alcanzó su límite temporal. Inténtalo más tarde.',
    502: 'No pudimos completar la generación de ideas. Inténtalo de nuevo.',
    503: 'El servicio de ideas no está disponible. Inténtalo más tarde.',
    504: 'La generación tardó demasiado. Inténtalo de nuevo.',
  }
  const status = Object.hasOwn(messages, error.status) ? error.status : 500
  res.status(status).json({ error: status === 500 ? 'Ocurrió un error inesperado. Inténtalo de nuevo.' : error.publicMessage || messages[status] })
}
