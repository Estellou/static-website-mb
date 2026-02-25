import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Form from '../components/Form'
import ContentMedia from '../components/ContentMedia'
import { CONTACT } from '../data/contact'

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
            title="Parlons de votre projet"
            text={`Vous avez une idée, un espace à aménager, un mobilier à créer ? Contactez-nous par téléphone au ${CONTACT.phoneNumber} ou via notre formulaire ci-dessus. Nous étudions chaque demande avec attention et vous répondons dans les plus brefs délais.`}
            imgPosition="right"
            img={{ src: '', alt: `Contactez ${CONTACT.companyName}` }}
          />
        </section>
      </main>
    </>
  )
}
