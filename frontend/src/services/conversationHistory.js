// El backend admite 2000 caracteres por mensaje del historial.
// Se conserva toda la estructura y se abrevia cada campo solo en el contexto;
// las tarjetas siempre muestran la respuesta completa.
const shorten = (value, max) => value.length <= max ? value : value.slice(0, max - 1) + '…'

export function responseToHistoryText(response) {
  return [
    `Modo: ${response.mode}`,
    shorten(response.intro, 300),
    ...response.ideas.map((idea, index) => [
      `${index + 1}. ${shorten(idea.title, 120)}`,
      `Descripción: ${shorten(idea.description, 200)}`,
      `Primer paso: ${shorten(idea.firstStep, 160)}`,
    ].join('\n')),
  ].join('\n\n')
}

export function buildConversationHistory(turns) {
  return turns.filter(turn => turn.status === 'response').flatMap(turn => [
    { role: 'user', content: turn.text },
    { role: 'assistant', content: responseToHistoryText(turn.response) },
  ]).slice(-10)
}

export function getConversationUsage(turns) {
  const used = turns.filter(turn => turn.status === 'response').length
  return { used, limited: used >= 6 }
}
