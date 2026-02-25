import { Ruler, PenTool, Hammer, Wrench } from 'lucide-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import ContentMedia from '../components/ContentMedia'
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'

const t = fr.home

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="hero">
          <Hero
            title={t.hero.title}
            text={interpolate(t.hero.text, { companyName: CONTACT.companyName })}
            primaryCta={{ label: t.hero.primaryCta, link: '/contact' }}
            secondaryCta={{ label: t.hero.secondaryCta, link: '#contact' }}
            img={{ src: '', alt: interpolate(t.hero.imgAlt, { companyName: CONTACT.companyName }) }}
          />
        </section>

        <section id="services">
          <Services
            title={t.services.title}
            services={[
              { icon: <Ruler size={32} strokeWidth={1.5} />, text: t.services.items[0] },
              { icon: <PenTool size={32} strokeWidth={1.5} />, text: t.services.items[1] },
              { icon: <Hammer size={32} strokeWidth={1.5} />, text: t.services.items[2] },
              { icon: <Wrench size={32} strokeWidth={1.5} />, text: t.services.items[3] },
            ]}
          />
        </section>

        <section id="projects">
          <Projects
            title={t.projects.title}
            projects={t.projects.items.map((item) => ({
              img: { src: '', alt: item.imgAlt },
              title: item.title,
              link: `/contact?projectType=${item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`,
            }))}
          />
        </section>

        <section id="story">
          <ContentMedia
            title={t.story.title}
            text={interpolate(t.story.text, { companyName: CONTACT.companyName })}
            imgPosition="left"
            img={{ src: '', alt: interpolate(t.story.imgAlt, { companyName: CONTACT.companyName }) }}
          />
        </section>

        <section id="contact">
          <ContentMedia
            title={t.contactUs.title}
            text={interpolate(t.contactUs.text, { phoneNumber: CONTACT.phoneNumber })}
            imgPosition="right"
            img={{ src: '', alt: interpolate(t.contactUs.imgAlt, { companyName: CONTACT.companyName }) }}
            cta={{ label: t.contactUs.cta, link: '/contact' }}
          />
        </section>
      </main>
    </>
  )
}
