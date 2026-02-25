import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Form from '../components/Form'
import ContentMedia from '../components/ContentMedia'
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'

const translations = fr.contact

export default function Contact() {
  const [searchParams] = useSearchParams()
  const projectType = searchParams.get('projectType') ?? 'autres'

  return (
    <>
      <Header />
      <main>
        <Form defaultProjectType={projectType} />
        <section id="contact">
          <ContentMedia
            title={translations.contactUs.title}
            text={interpolate(translations.contactUs.text, { phoneNumber: CONTACT.phoneNumber })}
            imgPosition="right"
            img={{ src: '', alt: interpolate(translations.contactUs.imgAlt, { companyName: CONTACT.companyName }) }}
          />
        </section>
      </main>
    </>
  )
}
