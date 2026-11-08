import mark from '../../assets/brand/ideaboost-mark.png'
import IdeaResponse from './IdeaResponse.jsx'
import styles from './ChatMessage.module.css'

export default function ChatMessage({ role, text, status, response, error, onRetry, busy }) {
  if (role === 'user') return <article className={styles.user} aria-label="Tu solicitud"><p className={styles.author}>Tú</p><p className={styles.request}>{text}</p></article>
  return <article className={styles.assistant} aria-label="Mensaje de IdeaBoost">
    <div className={styles.identity}><img src={mark} width="28" height="28" alt="" /><span className={styles.author}>IdeaBoost</span></div>
    {status === 'loading' && <div className={styles.loading}><span className={styles.dots} aria-hidden="true"><i /><i /><i /></span><p>Estamos preparando tus ideas…</p></div>}
    {status === 'response' && <IdeaResponse response={response} />}
    {status === 'error' && <div className={styles.error}><h2>No pudimos obtener tus ideas</h2><p>{error}</p><p>Tu solicitud y tu borrador se conservan.</p><button type="button" onClick={onRetry} disabled={busy}>Reintentar</button></div>}
  </article>
}
