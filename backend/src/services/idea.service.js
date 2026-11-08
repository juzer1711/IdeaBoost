import { requestIdeas } from '../providers/gemini.provider.js'

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const exactKeys = (value, keys) => isObject(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key))
const text = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max
const invalidResponse = () => Object.assign(new Error(), { status: 502, publicMessage: 'El servicio devolvió una respuesta incompleta. Inténtalo de nuevo.' })

export function validateIdeaResponse(value) {
  const counts = { ideas: 3, follow_up: 1, clarification: 0, greeting: 0, out_of_scope: 0 }
  if (!exactKeys(value, ['mode', 'intro', 'ideas']) || typeof value.mode !== 'string' || !Object.hasOwn(counts, value.mode) || !text(value.intro, 300) ||
      !Array.isArray(value.ideas) || value.ideas.length !== counts[value.mode]) throw invalidResponse()
  const ideas = value.ideas.map(idea => {
    if (!exactKeys(idea, ['title', 'description', 'firstStep']) ||
        !text(idea.title, 120) || !text(idea.description, 600) || !text(idea.firstStep, 400)) throw invalidResponse()
    return { title: idea.title.trim(), description: idea.description.trim(), firstStep: idea.firstStep.trim() }
  })
  return { mode: value.mode, intro: value.intro.trim(), ideas }
}

export async function createIdeas(input) {
  const raw = await requestIdeas(input)
  let result
  try { result = JSON.parse(raw) } catch { throw invalidResponse() }
  return validateIdeaResponse(result)
}
