import { Phone, Mail } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Form from '../components/Form'
import ContentMedia from '../components/ContentMedia'
import HorizontalContact from '../components/HorizontalContact'
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'

const translations = fr.contact

export default function Contact() {
  const [searchParams] = useSearchParams()
  const projectType = searchParams.get('projectType') ?? 'other'

  return (
    <>
      <Header />
      <main>
        <Form defaultProjectType={projectType} />
        <section id="contact">
          <ContentMedia
            title={translations.contactUs.title}
            text={translations.contactUs.text}
            imgPosition="right"
            img={{ src: '', alt: interpolate(translations.contactUs.imgAlt, { companyName: CONTACT.companyName }) }}
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
