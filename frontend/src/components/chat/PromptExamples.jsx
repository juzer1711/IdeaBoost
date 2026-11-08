import { promptExamples } from './promptExamples.js'
import styles from './PromptExamples.module.css'
export default function PromptExamples({ onSelect }) {
  return <section className={styles.section} aria-labelledby="chat-examples-title">
    <h2 id="chat-examples-title">¿Necesitas un punto de partida?</h2>
    <p>Elige un ejemplo y adáptalo a tu idea.</p>
    <ul className={styles.examples}>{promptExamples.map(example => <li key={example.category}>
      <button type="button" onClick={() => onSelect(example.text)}><strong>{example.category}</strong><span>{example.text}</span><span className={styles.action}>Usar ejemplo <span aria-hidden="true">↗</span></span></button>
    </li>)}</ul>
  </section>
}
