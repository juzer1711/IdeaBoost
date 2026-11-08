import { useRef } from 'react'
import PromptComposer from '../components/chat/PromptComposer.jsx'
import PromptExamples from '../components/chat/PromptExamples.jsx'
import ChatHistory from '../components/chat/ChatHistory.jsx'
import useIdeaChat from '../hooks/useIdeaChat.js'
import styles from './ChatPage.module.css'

export default function ChatPage() {
  const { prompt, setPrompt, turns, busy, submit, retry, used, limited, newConversation } = useIdeaChat()
  const inputRef = useRef(null)
  function selectExample(text) {
    setPrompt(text)
    inputRef.current.focus()
  }
  function reset() {
    newConversation()
    requestAnimationFrame(() => inputRef.current?.focus())
  }
  return <main id="contenido" tabIndex={-1} className={`container ${styles.page}`}>
    <div className={styles.beta}>
      <p>Versión beta: hasta 6 respuestas por conversación. El historial se reinicia al iniciar una conversación nueva.</p>
      <div className={styles.actions}><span role="status">{used} de 6 respuestas</span><button type="button" onClick={reset}>Nueva conversación</button></div>
    </div>
    <div className={styles.workspace}>
      {turns.length === 0 ? <section className={styles.empty} aria-labelledby="chat-title">
        <p className="eyebrow">Tu espacio creativo</p>
        <h1 id="chat-title">¿Qué tienes en mente?</h1>
        <p className={styles.intro}>Cuéntanos el tema o elige un ejemplo para empezar.</p>
        <PromptExamples onSelect={selectExample} />
      </section> : <ChatHistory turns={turns} onRetry={retry} busy={busy || limited} />}
      <div className={styles.bottom}>
        {limited && <p className={styles.limit} role="status">Has usado las 6 respuestas. Elige «Nueva conversación» para seguir creando.</p>}
        <PromptComposer value={prompt} onChange={setPrompt} inputRef={inputRef} onSubmit={submit} busy={busy} limited={limited} />
        <p id="generation-note" className={styles.notice}>Ideas generadas con IA. Revísalas y adáptalas a tu contexto.</p>
      </div>
    </div>
  </main>
}
