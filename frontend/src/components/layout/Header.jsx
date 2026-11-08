import { Link, NavLink, useMatch } from 'react-router-dom'
import mark from '../../assets/brand/ideaboost-mark.png'
import styles from './Header.module.css'

export default function Header() {
  const isChat = useMatch('/chat')
  return <>
    <a className={styles.skip} href="#contenido">Saltar al contenido</a>
    <header className={`${styles.header} ${isChat ? styles.compact : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} to="/" aria-label="IdeaBoost, inicio"><img src={mark} width="48" height="48" alt="" /><span>IdeaBoost</span></Link>
        {isChat ? <span className={styles.chatLabel}>Tu espacio de ideas</span> : <nav className={styles.nav} aria-label="Navegación principal">
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : undefined}>Inicio</NavLink>
          <NavLink to="/chat" className={({ isActive }) => isActive ? styles.active : undefined}>Abrir chat <span aria-hidden="true">↗</span></NavLink>
        </nav>}
      </div>
    </header>
  </>
}
