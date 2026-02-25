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
              { icon: <Ruler size={32} strokeWidth={1.5} />, text: translations.services.items[0] },
              { icon: <PenTool size={32} strokeWidth={1.5} />, text: translations.services.items[1] },
              { icon: <Hammer size={32} strokeWidth={1.5} />, text: translations.services.items[2] },
              { icon: <Wrench size={32} strokeWidth={1.5} />, text: translations.services.items[3] },
            ]}
          />
        </section>

        <section id="projects">
          <Projects
            title={translations.projects.title}
            projects={translations.projects.items.map((item) => ({
              img: { src: '', alt: item.imgAlt },
              title: item.title,
              link: `/contact?projectType=${item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`,
            }))}
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
