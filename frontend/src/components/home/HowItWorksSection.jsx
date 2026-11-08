import styles from './HowItWorksSection.module.css'
const steps = [
  ['Cuéntanos tu tema', 'Una frase sobre lo que necesitas es suficiente para empezar.'],
  ['Explora tres ideas', 'La IA te ayudará a descubrir distintas maneras de abordar tu tema.'],
  ['Dales tu toque', 'Usa las propuestas como punto de partida y adáptalas a tu contexto.'],
]
export default function HowItWorksSection() {
  return <section className={`container ${styles.section}`} aria-labelledby="how-title">
    <div className={styles.heading}><div><p className="eyebrow">Del «no sé» al «¿y si…?»</p><h2 id="how-title">Cómo funciona</h2></div><p>Un proceso sencillo para abrir posibilidades.</p></div>
    <ol className={styles.steps}>{steps.map(([title, text], index) => <li key={title}><span className={styles.number} aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    <p className={styles.preview}>Estamos construyendo este recorrido. Por ahora puedes abrir el chat y preparar tu solicitud; la generación con IA llegará próximamente.</p>
  </section>
}
