import HeroSection from '../components/home/HeroSection.jsx'
import UseCasesSection from '../components/home/UseCasesSection.jsx'
import HowItWorksSection from '../components/home/HowItWorksSection.jsx'
import PromptExamplesSection from '../components/home/PromptExamplesSection.jsx'
import FinalCTA from '../components/home/FinalCTA.jsx'
import styles from './HomePage.module.css'

export default function HomePage() {
  return <main id="contenido" tabIndex={-1} className={styles.page}>
    <HeroSection />
    <UseCasesSection />
    <HowItWorksSection />
    <PromptExamplesSection />
    <FinalCTA />
  </main>
}
