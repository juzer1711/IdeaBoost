import styles from './UseCaseIllustrations.module.css'

export default function CampaignIllustration() {
  return (
    <svg className={`${styles.illustration} ${styles.campaign}`} viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      <ellipse className={styles.shadow} cx="118" cy="137" rx="69" ry="6" />
      <g className={styles.line}>
        <path className={styles.accent} d="m91 89 14 39c2 6 20 1 18-5l-12-39" />
        <path className={styles.paper} d="m65 64 35-7 12 39-35 7c-11 2-19-36-12-39Z" />
        <path className={styles.accent} d="m100 57 50-30 27 78-65-9Z" />
        <ellipse className={styles.paper} cx="164" cy="66" rx="12" ry="41" transform="rotate(-19 164 66)" />
        <path d="m69 75 5 16m87-39 9 28M187 43l15-9m-10 30 19-2m-20 24 16 8" />
        <path className={styles.detail} d="m49 37 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" />
        <circle className={styles.detail} cx="190" cy="120" r="4" />
      </g>
    </svg>
  )
}
