import { Ruler, PenTool, Hammer, Wrench } from 'lucide-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
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

        <section id="projects">
          <Projects
            title="Nos réalisations"
            projects={[
              { img: { src: '', alt: 'Cuisine sur mesure' }, title: 'Cuisine', link: '/contact?projectType=cuisine' },
              { img: { src: '', alt: 'Bibliothèque sur mesure' }, title: 'Bibliothèque', link: '/contact?projectType=bibliotheque' },
              { img: { src: '', alt: 'Dressing sur mesure' }, title: 'Dressing', link: '/contact?projectType=dressing' },
              { img: { src: '', alt: 'Autres réalisations' }, title: 'Autres', link: '/contact?projectType=autres' },
            ]}
          />
        </section>

        <section id="story">
          <ContentMedia
            title="L'atelier Belmonte"
            text="Depuis plus de 20 ans, Menuiserie Belmonte conçoit et fabrique des pièces uniques dans son atelier. Chaque réalisation naît d'une écoute attentive, d'un dessin précis et d'un travail artisanal soigné. Nous intervenons auprès des particuliers et des professionnels pour créer des espaces sur mesure, du mobilier personnalisé et des agencements qui durent."
            imgPosition="left"
          />
        </section>

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
