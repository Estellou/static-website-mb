import { Calculator, Laptop, Hammer, Drill, Phone, Mail } from 'lucide-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import ContentMedia from '../components/ContentMedia'
import HorizontalContact from '../components/HorizontalContact'
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'
import chambreCarre from '../images/chambreCarre.webp'
import cuisineMeuble from '../images/cuisineMeuble.webp'
import sale2bain from '../images/salle2bain.webp'
import dressing from '../images/dressing.webp'
import portrait from '../images/portrait.webp'
import atelier from '../images/atelier.webp'

const translations = fr.home

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="hero">
          <Hero
            title={translations.hero.title}
            text={
              <>
                {translations.hero.textBefore}
                <strong>{CONTACT.companyName}</strong>
                {translations.hero.textAfter}
              </>
            }
            primaryCta={{ label: translations.hero.primaryCta, link: '#contact' }}
            img={{
              src: '',
              alt: interpolate(translations.hero.imgAlt, { companyName: CONTACT.companyName }),
            }}
          />
        </section>

        <section id="services">
          <Services
            title={translations.services.title}
            services={[
              {
                icon: <Calculator size={32} strokeWidth={1.5} />,
                text: translations.services.studies,
                description: translations.services.studiesDescription,
              },
              {
                icon: <Laptop size={32} strokeWidth={1.5} />,
                text: translations.services.design,
                description: translations.services.designDescription,
              },
              {
                icon: <Hammer size={32} strokeWidth={1.5} />,
                text: translations.services.production,
                description: translations.services.productionDescription,
              },
              {
                icon: <Drill size={32} strokeWidth={1.5} />,
                text: translations.services.installation,
                description: translations.services.installationDescription,
              },
            ]}
          />
        </section>

        <section id="projects">
          <Projects
            title={translations.projects.title}
            projects={[
              {
                img: { src: cuisineMeuble, alt: translations.projects.kitchen.imgAlt },
                title: translations.projects.kitchen.title,
              },
              {
                img: { src: dressing, alt: translations.projects.other.imgAlt },
                title: translations.projects.wardrobe.title,
              },
              {
                img: { src: sale2bain, alt: translations.projects.bathroom.imgAlt },
                title: translations.projects.bathroom.title,
              },
              {
                img: { src: chambreCarre, alt: translations.projects.bookcase.imgAlt },
                title: translations.projects.other.title,
              },
            ]}
          />
        </section>

        <section id="story">
          <ContentMedia
            title={translations.story.title}
            text={
              <>
                <strong>{CONTACT.companyName}</strong>
                {translations.story.textBefore}
                <a
                  href={translations.story.schoolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black transition-colors"
                >
                  {translations.story.schoolName}
                </a>
                {translations.story.textAfter}
              </>
            }
            imgPosition="left"
            img={{
              src: atelier,
              alt: interpolate(translations.story.imgAlt, { companyName: CONTACT.companyName }),
            }}
          />
        </section>
      </main>
      <footer id="contact">
        <ContentMedia
          title={translations.contactUs.title}
          text={translations.contactUs.text}
          imgPosition="right"
          img={{
            src: portrait,
            alt: interpolate(translations.contactUs.imgAlt, { companyName: CONTACT.companyName }),
          }}
        >
          <HorizontalContact
            items={[
              {
                icon: <Phone size={20} strokeWidth={1.5} />,
                label: translations.contactUs.phoneLabel,
                value: CONTACT.phoneNumber,
              },
              {
                icon: <Mail size={20} strokeWidth={1.5} />,
                label: translations.contactUs.emailLabel,
                value: CONTACT.email,
              },
            ]}
          />
        </ContentMedia>
      </footer>
    </>
  )
}
