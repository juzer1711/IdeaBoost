import { Router } from 'express'
import { generateIdeas } from '../controllers/ideas.controller.js'
import { validateIdeaRequest } from '../middleware/validateIdeaRequest.js'
const router = Router()
router.post('/generate', validateIdeaRequest, generateIdeas)
export default router
