import styles from './Footer.module.css'
import { useMatch } from 'react-router-dom'
export default function Footer() {
  const isChat = useMatch('/chat')
  if (isChat) return null
  return <footer className={styles.footer}><div className={`container ${styles.inner}`}><p><strong>IdeaBoost</strong> · Una chispa, muchas posibilidades.</p><p>Un proyecto educativo de ideación con IA.</p></div></footer>
}
