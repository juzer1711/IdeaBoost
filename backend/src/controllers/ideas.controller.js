import { createIdeas } from '../services/idea.service.js'
export async function generateIdeas(req, res) {
  const result = await createIdeas(req.ideaRequest)
  res.json(result)
}
