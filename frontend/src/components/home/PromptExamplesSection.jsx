import { promptExamples } from '../chat/promptExamples.js'
import styles from './PromptExamplesSection.module.css'
export default function PromptExamplesSection() {
  return <section className={styles.section} aria-labelledby="examples-title"><div className={`container ${styles.inner}`}>
    <div><p className="eyebrow">La inspiración empieza aquí</p><h2 id="examples-title">No necesitas<br />la pregunta perfecta.</h2><p className={styles.intro}>Así de simple puede ser tu primera solicitud.</p></div>
    <ul className={styles.examples}>{promptExamples.map((example, index) => <li key={example.category}><span className={styles.index} aria-hidden="true">0{index + 1}</span><div><h3>{example.category}</h3><p>«{example.text}»</p></div></li>)}</ul>
  </div></section>
}
