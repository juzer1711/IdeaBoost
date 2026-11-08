import { useLayoutEffect } from 'react'
import styles from './PromptComposer.module.css'
import { isSendKey } from './composerKeyboard.js'

export default function PromptComposer({ value, onChange, inputRef, onSubmit, busy, limited }) {
  useLayoutEffect(() => {
    const input = inputRef.current
    input.style.height = 'auto'
    input.style.height = Math.min(input.scrollHeight, 112) + 'px'
  }, [value, inputRef])

  function handleKeyDown(event) {
    if (!isSendKey({ key: event.key, shiftKey: event.shiftKey, isComposing: event.nativeEvent.isComposing, keyCode: event.keyCode })) return
    event.preventDefault()
    if (!busy && !limited && value.trim()) event.currentTarget.form.requestSubmit()
  }

  return <form className={styles.composer} onSubmit={onSubmit} aria-label="Escribir una solicitud">
    <label htmlFor="prompt">¿Para qué necesitas ideas?</label>
    <div className={styles.inputRow}>
      <textarea ref={inputRef} id="prompt" value={value} onChange={event => onChange(event.target.value)} onKeyDown={handleKeyDown} disabled={limited} maxLength={500} rows={1} placeholder={limited ? 'Inicia una nueva conversación para continuar.' : 'Escribe tu tema o continúa una idea…'} aria-describedby="prompt-help generation-note" />
      <button type="submit" disabled={busy || limited || !value.trim() || value.trim().length > 500}>{busy ? 'Generando…' : 'Enviar'} <span aria-hidden="true">↑</span></button>
    </div>
    <div id="prompt-help" className={styles.meta}><span>Enter para enviar · Shift+Enter para nueva línea</span><span>{value.length}/500</span></div>
  </form>
}
