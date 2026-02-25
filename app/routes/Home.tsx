import { Ruler, PenTool, Hammer, Wrench } from 'lucide-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import ContentMedia from '../components/ContentMedia'
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'

const translations = fr.home

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="hero">
          <Hero
            title={translations.hero.title}
            text={interpolate(translations.hero.text, { companyName: CONTACT.companyName })}
            primaryCta={{ label: translations.hero.primaryCta, link: '/contact' }}
            secondaryCta={{ label: translations.hero.secondaryCta, link: '#contact' }}
            img={{ src: '', alt: interpolate(translations.hero.imgAlt, { companyName: CONTACT.companyName }) }}
          />
        </section>

        <section id="services">
          <Services
            title={translations.services.title}
            services={[
              { icon: <Ruler size={32} strokeWidth={1.5} />,   text: translations.services.etudes },
              { icon: <PenTool size={32} strokeWidth={1.5} />, text: translations.services.conception },
              { icon: <Hammer size={32} strokeWidth={1.5} />,  text: translations.services.realisation },
              { icon: <Wrench size={32} strokeWidth={1.5} />,  text: translations.services.pose },
            ]}
          />
        </section>

        <section id="projects">
          <Projects
            title={translations.projects.title}
            projects={[
              { img: { src: '', alt: translations.projects.cuisine.imgAlt },     title: translations.projects.cuisine.title,     link: '/contact?projectType=cuisine' },
              { img: { src: '', alt: translations.projects.bibliotheque.imgAlt }, title: translations.projects.bibliotheque.title, link: '/contact?projectType=bibliotheque' },
              { img: { src: '', alt: translations.projects.dressing.imgAlt },    title: translations.projects.dressing.title,    link: '/contact?projectType=dressing' },
              { img: { src: '', alt: translations.projects.autres.imgAlt },      title: translations.projects.autres.title,      link: '/contact?projectType=autres' },
            ]}
          />
        </section>

        <section id="story">
          <ContentMedia
            title={translations.story.title}
            text={interpolate(translations.story.text, { companyName: CONTACT.companyName })}
            imgPosition="left"
            img={{ src: '', alt: interpolate(translations.story.imgAlt, { companyName: CONTACT.companyName }) }}
          />
        </section>

        <section id="contact">
          <ContentMedia
            title={translations.contactUs.title}
            text={interpolate(translations.contactUs.text, { phoneNumber: CONTACT.phoneNumber })}
            imgPosition="right"
            img={{ src: '', alt: interpolate(translations.contactUs.imgAlt, { companyName: CONTACT.companyName }) }}
            cta={{ label: translations.contactUs.cta, link: '/contact' }}
          />
        </section>
      </main>
    </>
  )
}
