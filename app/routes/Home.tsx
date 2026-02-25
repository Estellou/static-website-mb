import { Ruler, PenTool, Hammer, Wrench } from 'lucide-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import ContentMedia from '../components/ContentMedia'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="hero">
          <Hero
            title="De la matière à la création"
            text="Menuiserie Belmonte réalise sur mesure vos agencements et mobiliers. Chaque projet est pensé, conçu et fabriqué artisanalement pour s'adapter parfaitement à votre espace et à vos envies."
            primaryCta={{ label: 'Démarrer un projet', link: '/contact' }}
            secondaryCta={{ label: 'Nous contacter', link: '#contact' }}
          />
        </section>

        <section id="services">
          <Services
            title="Notre savoir-faire"
            services={[
              { icon: <Ruler size={32} strokeWidth={1.5} />, text: 'Études' },
              { icon: <PenTool size={32} strokeWidth={1.5} />, text: 'Conception' },
              { icon: <Hammer size={32} strokeWidth={1.5} />, text: 'Réalisation' },
              { icon: <Wrench size={32} strokeWidth={1.5} />, text: 'Pose' },
            ]}
          />
        </section>

        {/* id="projects" and id="story" reserved for future slices */}

        <section id="contact">
          <ContentMedia
            title="Parlons de votre projet"
            text="Vous avez une idée, un espace à aménager, un mobilier à créer ? Contactez-nous par téléphone au 06 00 00 00 00 ou via notre formulaire de contact. Nous étudions chaque demande avec attention et vous répondons dans les plus brefs délais."
            imgPosition="right"
            cta={{ label: 'Démarrer un projet', link: '/contact' }}
          />
        </section>
      </main>
    </>
  )
}
