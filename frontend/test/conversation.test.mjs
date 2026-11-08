import test from 'node:test'
import assert from 'node:assert/strict'
import { buildConversationHistory, responseToHistoryText, getConversationUsage } from '../src/services/conversationHistory.js'
import { isSendKey } from '../src/components/chat/composerKeyboard.js'
import { validateIdeaResponse } from '../src/services/ideaApi.js'

// Datos exclusivos del validador y la serialización; no se sirven a la interfaz.
const response = { mode: 'ideas', intro: 'Introducción', ideas: Array.from({ length: 3 }, (_, i) => ({
  title: 'Título ' + i, description: 'Descripción ' + i, firstStep: 'Acción ' + i,
})) }

test('contexto vacío en la primera solicitud', () => {
  assert.deepEqual(buildConversationHistory([]), [])
})

test('la sexta solicitud conserva los diez mensajes previos', () => {
  const turns = Array.from({ length: 5 }, (_, id) => ({ id, text: 'Solicitud ' + id, status: 'response', response }))
  const history = buildConversationHistory(turns)
  assert.equal(history.length, 10)
  assert.equal(history[0].content, 'Solicitud 0')
  assert.equal(history[8].content, 'Solicitud 4')
  assert.equal(getConversationUsage(turns).limited, false)
})

test('no incluye solicitudes fallidas ni pendientes en el contexto', () => {
  const history = buildConversationHistory([
    { text: 'Completada', status: 'response', response },
    { text: 'Fallida', status: 'error' },
    { text: 'Actual', status: 'loading' },
  ])
  assert.equal(history.length, 2)
  assert.equal(history[0].content, 'Completada')
})

test('serializa todos los campos de las tres ideas', () => {
  const result = responseToHistoryText(response)
  assert.ok(result.includes(response.intro))
  for (const idea of response.ideas) {
    for (const value of Object.values(idea)) assert.ok(result.includes(value))
  }
})

test('contexto extenso respeta los 2000 caracteres sin alterar la respuesta visible', () => {
  const longResponse = { mode: 'ideas', intro: 'I'.repeat(300), ideas: Array.from({ length: 3 }, () => ({
    title: 'T'.repeat(120), description: 'D'.repeat(600), firstStep: 'P'.repeat(400),
  })) }
  const text = responseToHistoryText(longResponse)
  assert.ok(text.length <= 2000)
  assert.equal(text.split('Descripción:').length - 1, 3)
  assert.equal(text.split('Primer paso:').length - 1, 3)
  assert.equal(longResponse.ideas[0].description.length, 600)
})

test('los cinco modos respetan su cantidad de tarjetas', () => {
  for (const [mode, count] of Object.entries({ ideas: 3, follow_up: 1, greeting: 0, clarification: 0, out_of_scope: 0 })) {
    const body = { mode, intro: 'Respuesta', ideas: response.ideas.slice(0, count) }
    assert.equal(validateIdeaResponse(body).ideas.length, count)
    assert.throws(() => validateIdeaResponse({ ...body, ideas: [...body.ideas, response.ideas[0]] }))
  }
  assert.throws(() => validateIdeaResponse({ mode: 'otro', intro: 'Respuesta', ideas: [] }))
})

test('seis éxitos bloquean el siguiente envío, errores no cuentan y reiniciar libera el límite', () => {
  const turns = Array.from({ length: 6 }, () => ({ status: 'response', response }))
  assert.deepEqual(getConversationUsage(turns), { used: 6, limited: true })
  assert.deepEqual(getConversationUsage([...turns.slice(0, 5), { status: 'error' }, { status: 'loading' }]), { used: 5, limited: false })
  assert.deepEqual(getConversationUsage([]), { used: 0, limited: false })
})

test('Enter envía; Shift+Enter y composición de teclado conservan la nueva línea', () => {
  assert.equal(isSendKey({ key: 'Enter' }), true)
  assert.equal(isSendKey({ key: 'Enter', shiftKey: true }), false)
  assert.equal(isSendKey({ key: 'Enter', isComposing: true }), false)
  assert.equal(isSendKey({ key: 'Enter', keyCode: 229 }), false)
  assert.equal(isSendKey({ key: 'a' }), false)
})

test('rechaza respuestas incompletas antes de mostrarlas', () => {
  for (const body of [null, {}, { ...response, ideas: [] }, { ...response, ideas: response.ideas.slice(1) },
    { ...response, ideas: [...response.ideas.slice(1), { title: 'Título', description: '', firstStep: 'Paso' }] }]) {
    assert.throws(() => validateIdeaResponse(body))
  }
  assert.deepEqual(validateIdeaResponse(response), response)
})
