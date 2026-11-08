import { Link } from 'react-router-dom'
import mark from '../../assets/brand/ideaboost-mark.png'
import styles from './FinalCTA.module.css'
export default function FinalCTA() {
  return <section className={`container ${styles.section}`} aria-labelledby="final-title">
    <div className={styles.banner}><img className={styles.mark} src={mark} width="72" height="72" alt="" aria-hidden="true" /><div><h2 id="final-title">Tu próxima idea empieza contigo.</h2><p>Trae una inquietud. Dale un lugar para crecer.</p></div><Link className={styles.link} to="/chat">Empezar a crear <span aria-hidden="true">↗</span></Link></div>
  </section>
}
