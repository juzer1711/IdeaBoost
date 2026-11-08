import styles from './UseCasesSection.module.css'
import CampaignIllustration from './CampaignIllustration.jsx'
import EventsIllustration from './EventsIllustration.jsx'
import ProjectNamesIllustration from './ProjectNamesIllustration.jsx'
const cases = [
  { title: 'Campañas que conectan', text: 'Busca enfoques creativos para comunicar una causa o movilizar a tu comunidad.', illustration: <CampaignIllustration />, label: '01 / CAMPAÑAS' },
  { title: 'Encuentros con propósito', text: 'Explora actividades y eventos para aprender, compartir o celebrar en grupo.', illustration: <EventsIllustration />, label: '02 / ACTIVIDADES Y EVENTOS' },
  { title: 'Nombres con personalidad', text: 'Encuentra un punto de partida para darle identidad a tu próximo proyecto.', illustration: <ProjectNamesIllustration />, label: '03 / NOMBRES DE PROYECTOS' },
]
export default function UseCasesSection() {
  return <section className={styles.section} aria-labelledby="uses-title"><div className="container">
    <p className="eyebrow">Un impulso para lo que imaginas</p>
    <h2 id="uses-title">¿Qué quieres poner en marcha?</h2>
    <ul className={styles.cases}>{cases.map(item => <li key={item.title} className={styles.item}>
      <div className={styles.visual} aria-hidden="true">{item.illustration}</div>
      <p className={styles.label}>{item.label}</p><h3>{item.title}</h3><p className={styles.description}>{item.text}</p>
    </li>)}</ul>
  </div></section>
}
