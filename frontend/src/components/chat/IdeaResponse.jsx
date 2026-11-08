import styles from './IdeaResponse.module.css'

export default function IdeaResponse({ response }) {
  return <div className={styles.response}>
    <p className={styles.intro}>{response.intro}</p>
    {response.ideas.length > 0 && <ol className={styles.ideas}>{response.ideas.map((idea, index) => <li key={index}>
      <h3>{idea.title}</h3>
      <p>{idea.description}</p>
      <p className={styles.step}><strong>Primer paso</strong>{idea.firstStep}</p>
    </li>)}</ol>}
  </div>
}
