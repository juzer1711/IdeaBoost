import { useEffect, useRef, useState } from 'react'
import { generateIdeas } from '../services/ideaApi.js'
import { buildConversationHistory, getConversationUsage } from '../services/conversationHistory.js'

export default function useIdeaChat() {
  const [prompt, setPrompt] = useState('')
  const [turns, setTurns] = useState([])
  const activeRequest = useRef(null)
  const nextId = useRef(0)
  const usedRef = useRef(0)
  const { used, limited } = getConversationUsage(turns)
  const busy = turns.some(turn => turn.status === 'loading')

  useEffect(() => () => {
    activeRequest.current?.abort()
    activeRequest.current = null
  }, [])

  async function requestTurn(turn) {
    if (activeRequest.current || usedRef.current >= 6) return
    const controller = new AbortController()
    activeRequest.current = controller
    setTurns(previous => previous.map(item => item.id === turn.id ? { ...item, status: 'loading', error: null } : item))
    try {
      const response = await generateIdeas({ message: turn.text, history: turn.history, signal: controller.signal })
      if (controller.signal.aborted) return
      usedRef.current += 1
      setTurns(previous => previous.map(item => item.id === turn.id ? { ...item, status: 'response', response } : item))
      setPrompt(current => current.trim() === turn.text ? '' : current)
    } catch (error) {
      if (controller.signal.aborted) return
      setTurns(previous => previous.map(item => item.id === turn.id ? { ...item, status: 'error', error: error.message } : item))
    } finally {
      if (activeRequest.current === controller) activeRequest.current = null
    }
  }

  function submit(event) {
    event.preventDefault()
    const text = prompt.trim()
    if (!text || text.length > 500 || activeRequest.current || usedRef.current >= 6) return
    const turn = { id: nextId.current++, text, history: buildConversationHistory(turns), status: 'loading' }
    setTurns(previous => [...previous, turn])
    void requestTurn(turn)
  }

  function retry(turn) {
    if (turn.status === 'error') void requestTurn(turn)
  }

  function newConversation() {
    activeRequest.current?.abort()
    activeRequest.current = null
    usedRef.current = 0
    setTurns([])
    setPrompt('')
  }

  return { prompt, setPrompt, turns, busy, submit, retry, used, limited, newConversation }
}
