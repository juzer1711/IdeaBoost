import styles from './UseCaseIllustrations.module.css'

export default function ProjectNamesIllustration() {
  return (
    <svg className={`${styles.illustration} ${styles.names}`} viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      <ellipse className={styles.shadow} cx="120" cy="137" rx="69" ry="6" />
      <g className={styles.line}>
        <path className={styles.accent} d="m63 53 78-21 30 24-14 37-78 21Z" />
        <path className={styles.paper} d="m65 69 80-7 30 29-25 33-80 7Z" />
        <circle className={styles.detail} cx="147" cy="94" r="5" />
        <path d="M151 92c39-27 44-61 21-66-18-4-23 12-12 20m-76 43 35-3m-34 19 23-2" />
        <path className={styles.detail} d="m51 36 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" />
        <path d="m184 109 12 7m-17 5 6 11" />
        <circle className={styles.accent} cx="103" cy="22" r="4" />
      </g>
    </svg>
  )
}
