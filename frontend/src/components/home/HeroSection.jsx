import { Link } from 'react-router-dom'
import mark from '../../assets/brand/ideaboost-mark.png'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return <section className={`container ${styles.hero}`} aria-labelledby="home-title">
    <div className={styles.copy}>
      <p className="eyebrow">Dale espacio a tu creatividad</p>
      <h1 id="home-title">Una pequeña chispa.<br /><span>Tu próxima gran idea.</span></h1>
      <p className={styles.description}>IdeaBoost te ayuda a explorar ideas con IA para campañas, actividades, eventos y nombres de proyectos. Empieza con lo que tienes en mente.</p>
      <Link className="primary-link" to="/chat">Empezar a crear <span aria-hidden="true">↗</span></Link>
      <p className={styles.note}>Sin formularios largos. Solo tu tema o necesidad.</p>
    </div>
    <div className={styles.art} aria-hidden="true">
      <div className={styles.orbit} />
      <span className={styles.tag}>¿Y SI…?</span>
      <img src={mark} width="350" height="350" alt="" />
      <span className={styles.spark}>✳</span>
      <div className={styles.paper}>Una pregunta puede<br /><b>abrir mil caminos.</b><span>↗</span></div>
      <span className={styles.caption}>EL PRIMER PASO ES IMAGINAR</span>
    </div>
  </section>
}
