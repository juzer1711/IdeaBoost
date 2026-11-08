import { GoogleGenAI } from '@google/genai'
import { ideaResponseSchema, systemInstruction } from '../prompts/idea.prompt.js'

const providerError = (status, publicMessage) => Object.assign(new Error(), { status, publicMessage })

export async function requestIdeas({ message, history }) {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  const model = process.env.GEMINI_MODEL?.trim()
  if (!apiKey || !model) throw providerError(503, 'La generación de ideas no está configurada. Inténtalo más tarde.')
  try {
    const client = new GoogleGenAI({ apiKey })
    const interaction = await client.interactions.create({
      model,
      store: false,
      stream: false,
      system_instruction: systemInstruction,
      input: [
        ...history.map(entry => ({
          type: entry.role === 'user' ? 'user_input' : 'model_output',
          content: [{ type: 'text', text: entry.content }],
        })),
        { type: 'user_input', content: [{ type: 'text', text: message }] },
      ],
      response_format: { type: 'text', mime_type: 'application/json', schema: ideaResponseSchema },
    }, { timeout_ms: 45000, retries: { strategy: 'none' } })
    if (interaction.status !== 'completed') throw providerError(502, 'No se pudo completar la generación. Inténtalo de nuevo.')
    const text = interaction.output_text ?? (interaction.steps ?? [])
      .filter(step => step.type === 'model_output')
      .flatMap(step => step.content ?? [])
      .filter(content => content.type === 'text')
      .map(content => content.text).join('')
    return text
  } catch (error) {
    // No se registran errores crudos del SDK: pueden incluir datos de la solicitud.
    if (error.publicMessage) throw error
    const status = Number(error.status ?? error.statusCode ?? error.code)
    if (status === 429) throw providerError(429, 'El servicio de ideas alcanzó su límite temporal. Inténtalo más tarde.')
    if (error.name?.includes('Timeout') || error.name === 'AbortError') {
      throw providerError(504, 'La generación tardó demasiado. Inténtalo de nuevo.')
    }
    if ([401, 403, 404].includes(status)) throw providerError(503, 'El servicio de ideas no está disponible. Inténtalo más tarde.')
    throw providerError(502, 'No pudimos comunicarnos con el servicio de ideas. Inténtalo de nuevo.')
  }
}
