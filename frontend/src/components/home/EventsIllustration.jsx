import styles from './UseCaseIllustrations.module.css'

export default function EventsIllustration() {
  return (
    <svg className={`${styles.illustration} ${styles.events}`} viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      <ellipse className={styles.shadow} cx="120" cy="137" rx="69" ry="6" />
      <g className={styles.line}>
        <rect className={styles.paper} x="66" y="37" width="108" height="91" rx="10" transform="rotate(-5 120 82)" />
        <path className={styles.accent} d="m71 41 90-8c6 0 10 3 11 9l1 17-108 9-1-17c0-5 2-9 7-10Z" />
        <path d="m89 29 1 19m58-24 2 19" />
        <path className={styles.detail} d="m120 73 6 12 13 1-10 9 3 13-12-7-12 7 3-13-10-9 13-1Z" />
        <path d="m80 84 7-1m-5 18 7-1m65-22 7-1m-5 18 7-1M44 67l-8-9m149-9 10-9m-4 47 13 3" />
        <circle className={styles.accent} cx="48" cy="110" r="5" />
        <path className={styles.detail} d="m183 111 4-7 4 7 7 4-7 4-4 7-4-7-7-4Z" />
      </g>
    </svg>
  )
}
