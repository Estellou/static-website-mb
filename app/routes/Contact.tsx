import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Form from '../components/Form'
import ContentMedia from '../components/ContentMedia'
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'

const t = fr.contact

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
            title={t.contactUs.title}
            text={interpolate(t.contactUs.text, { phoneNumber: CONTACT.phoneNumber })}
            imgPosition="right"
            img={{ src: '', alt: interpolate(t.contactUs.imgAlt, { companyName: CONTACT.companyName }) }}
          />
        </section>
      </main>
    </>
  )
}
