import { useState } from 'react'
import Input from './Input'
import Select from './Select'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string

const PROJECT_TYPES = [
  { value: 'cuisine', label: 'Cuisine' },
  { value: 'bibliotheque', label: 'Bibliothèque' },
  { value: 'dressing', label: 'Dressing' },
  { value: 'autres', label: 'Autres' },
]

const DESCRIPTION_PLACEHOLDER =
  'Décrivez votre projet en détail : type de réalisation souhaitée, dimensions approximatives, matériaux envisagés, contraintes particulières et délai souhaité. Plus votre description est précise, mieux nous pourrons vous accompagner.'

const MIN_WORDS = 100

interface FormData {
  firstName: string
  familyName: string
  email: string
  phone: string
  companyName: string
  projectType: string
  description: string
}

interface FormErrors {
  firstName?: string
  familyName?: string
  email?: string
  phone?: string
  description?: string
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

interface FormProps {
  defaultProjectType?: string
}

export default function Form({ defaultProjectType = 'autres' }: FormProps) {
  const [data, setData] = useState<FormData>({
    firstName: '',
    familyName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: PROJECT_TYPES.some((t) => t.value === defaultProjectType)
      ? defaultProjectType
      : 'autres',
    description: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function set(field: keyof FormData) {
    return (value: string) => setData((prev) => ({ ...prev, [field]: value }))
  }

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!data.firstName.trim()) errs.firstName = 'Le prénom est requis.'
    if (!data.familyName.trim()) errs.familyName = 'Le nom est requis.'
    if (!data.email.trim()) {
      errs.email = "L'adresse e-mail est requise."
    } else if (!validateEmail(data.email)) {
      errs.email = "L'adresse e-mail n'est pas valide."
    }
    if (!data.phone.trim()) errs.phone = 'Le numéro de téléphone est requis.'
    const wordCount = countWords(data.description)
    if (!data.description.trim()) {
      errs.description = 'La description est requise.'
    } else if (wordCount < MIN_WORDS) {
      errs.description = `La description doit contenir au moins ${MIN_WORDS} mots (${wordCount} mot${wordCount > 1 ? 's' : ''} actuellement).`
    }
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          familyName: data.familyName,
          email: data.email,
          phone: data.phone,
          companyName: data.companyName || 'Non renseigné',
          projectType: PROJECT_TYPES.find((t) => t.value === data.projectType)?.label,
          description: data.description,
        }),
      })
      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const wordCount = countWords(data.description)

  if (status === 'success') {
    return (
      <section className="w-full px-6 py-24 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-black mb-4">Message envoyé !</h2>
          <p className="text-base text-gray-600">
            Merci pour votre message. Nous avons bien reçu votre demande et reviendrons vers vous
            dans les plus brefs délais.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-6 py-20 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold text-black mb-10">Démarrer un projet</h2>
        {status === 'error' && (
          <p className="text-sm text-red-500 mb-6">
            Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.
          </p>
        )}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Prénom"
              name="firstName"
              required
              value={data.firstName}
              onChange={set('firstName')}
              error={errors.firstName}
            />
            <Input
              label="Nom"
              name="familyName"
              required
              value={data.familyName}
              onChange={set('familyName')}
              error={errors.familyName}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Adresse e-mail"
              name="email"
              type="email"
              required
              value={data.email}
              onChange={set('email')}
              error={errors.email}
            />
            <Input
              label="Téléphone"
              name="phone"
              type="tel"
              required
              value={data.phone}
              onChange={set('phone')}
              error={errors.phone}
            />
          </div>
          <Input
            label="Entreprise"
            name="companyName"
            value={data.companyName}
            onChange={set('companyName')}
          />
          <Select
            label="Type de projet"
            name="projectType"
            options={PROJECT_TYPES}
            value={data.projectType}
            onChange={set('projectType')}
          />
          <div className="flex flex-col gap-1.5">
            <Input
              label="Description du projet"
              name="description"
              multiline
              required
              placeholder={DESCRIPTION_PLACEHOLDER}
              value={data.description}
              onChange={set('description')}
              error={errors.description}
            />
            <p className={`text-xs text-right ${wordCount >= MIN_WORDS ? 'text-green-600' : 'text-gray-400'}`}>
              {wordCount} / {MIN_WORDS} mots minimum
            </p>
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="self-start bg-black text-white px-10 py-3 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </button>
        </form>
      </div>
    </section>
  )
}
