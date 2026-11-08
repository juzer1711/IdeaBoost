import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage.jsx'
import styles from './ChatHistory.module.css'

export default function ChatHistory({ turns, onRetry, busy }) {
  const historyRef = useRef(null)
  useEffect(() => {
    const history = historyRef.current
    const latest = history.querySelector('[data-latest-message]')
    if (latest) history.scrollTop += latest.getBoundingClientRect().top - history.getBoundingClientRect().top - 8
  }, [turns])
  return <section ref={historyRef} className={styles.history} aria-label="Historial de conversación" tabIndex={0}>
    <h1 className={styles.title}>Tu conversación</h1>
    <div role="log" aria-label="Mensajes" aria-live="polite" aria-relevant="additions text">
      {turns.map((turn, index) => <div key={turn.id} className={styles.turn}>
        <ChatMessage role="user" text={turn.text} />
        <div data-latest-message={index === turns.length - 1 ? '' : undefined}><ChatMessage role="assistant" status={turn.status} response={turn.response} error={turn.error} onRetry={() => onRetry(turn)} busy={busy} /></div>
      </div>)}
    </div>
  </section>
}
