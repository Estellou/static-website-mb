import { Ruler, PenTool, Hammer, Wrench, Phone, Mail } from 'lucide-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import ContentMedia from '../components/ContentMedia'
import HorizontalContact from '../components/HorizontalContact'
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
              { icon: <Ruler size={32} strokeWidth={1.5} />,   text: translations.services.studies },
              { icon: <PenTool size={32} strokeWidth={1.5} />, text: translations.services.design },
              { icon: <Hammer size={32} strokeWidth={1.5} />,  text: translations.services.production },
              { icon: <Wrench size={32} strokeWidth={1.5} />,  text: translations.services.installation },
            ]}
          />
        </section>

        <section id="projects">
          <Projects
            title={translations.projects.title}
            projects={[
              { img: { src: '', alt: translations.projects.kitchen.imgAlt },  title: translations.projects.kitchen.title,  link: '/contact?projectType=kitchen' },
              { img: { src: '', alt: translations.projects.bookcase.imgAlt }, title: translations.projects.bookcase.title, link: '/contact?projectType=bookcase' },
              { img: { src: '', alt: translations.projects.wardrobe.imgAlt }, title: translations.projects.wardrobe.title, link: '/contact?projectType=wardrobe' },
              { img: { src: '', alt: translations.projects.other.imgAlt },    title: translations.projects.other.title,    link: '/contact?projectType=other' },
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
            text={translations.contactUs.text}
            imgPosition="right"
            img={{ src: '', alt: interpolate(translations.contactUs.imgAlt, { companyName: CONTACT.companyName }) }}
            cta={{ label: translations.contactUs.cta, link: '/contact' }}
          >
            <HorizontalContact
              items={[
                { icon: <Phone size={20} strokeWidth={1.5} />, label: translations.contactUs.phoneLabel, value: CONTACT.phoneNumber },
                { icon: <Mail size={20} strokeWidth={1.5} />,  label: translations.contactUs.emailLabel,  value: CONTACT.email },
              ]}
            />
          </ContentMedia>
        </section>
      </main>
    </>
  )
}
