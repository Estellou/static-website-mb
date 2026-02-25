import { useState } from 'react'
import Input from './Input'
import Select from './Select'
import { fr, interpolate } from '../translations'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string

const translations = fr.contact.form

// Derive [{ value, label }] array from the projectTypes string record
const PROJECT_TYPES = Object.entries(translations.projectTypes).map(([value, label]) => ({
  value,
  label,
}))

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
    projectType: defaultProjectType in translations.projectTypes ? defaultProjectType : 'autres',
    description: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function set(field: keyof FormData) {
    return (value: string) => setData((prev) => ({ ...prev, [field]: value }))
  }

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!data.firstName.trim()) errs.firstName = translations.validation.firstNameRequired
    if (!data.familyName.trim()) errs.familyName = translations.validation.familyNameRequired
    if (!data.email.trim()) {
      errs.email = translations.validation.emailRequired
    } else if (!validateEmail(data.email)) {
      errs.email = translations.validation.emailInvalid
    }
    if (!data.phone.trim()) errs.phone = translations.validation.phoneRequired
    const wordCount = countWords(data.description)
    if (!data.description.trim()) {
      errs.description = translations.validation.descriptionRequired
    } else if (wordCount < MIN_WORDS) {
      errs.description = interpolate(translations.validation.descriptionMinWords, {
        min: String(MIN_WORDS),
        count: String(wordCount),
        plural: wordCount > 1 ? 's' : '',
      })
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
          projectType: translations.projectTypes[data.projectType as keyof typeof translations.projectTypes],
          description: data.description,
        }),
      })
      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const wordCount = countWords(data.description)

  if (status === 'success') {
    return (
      <section className="w-full px-6 py-24 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-black mb-4">{translations.success.title}</h2>
          <p className="text-base text-gray-600">{translations.success.text}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-6 py-20 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold text-black mb-10">{translations.title}</h2>
        {status === 'error' && (
          <p className="text-sm text-red-500 mb-6">{translations.error}</p>
        )}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label={translations.fields.firstName.label}
              name="firstName"
              required
              value={data.firstName}
              onChange={set('firstName')}
              error={errors.firstName}
            />
            <Input
              label={translations.fields.familyName.label}
              name="familyName"
              required
              value={data.familyName}
              onChange={set('familyName')}
              error={errors.familyName}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label={translations.fields.email.label}
              name="email"
              type="email"
              required
              value={data.email}
              onChange={set('email')}
              error={errors.email}
            />
            <Input
              label={translations.fields.phone.label}
              name="phone"
              type="tel"
              required
              value={data.phone}
              onChange={set('phone')}
              error={errors.phone}
            />
          </div>
          <Input
            label={translations.fields.companyName.label}
            name="companyName"
            value={data.companyName}
            onChange={set('companyName')}
          />
          <Select
            label={translations.fields.projectType.label}
            name="projectType"
            options={PROJECT_TYPES}
            value={data.projectType}
            onChange={set('projectType')}
          />
          <div className="flex flex-col gap-1.5">
            <Input
              label={translations.fields.description.label}
              name="description"
              multiline
              required
              placeholder={translations.fields.description.placeholder}
              value={data.description}
              onChange={set('description')}
              error={errors.description}
            />
            <p className={`text-xs text-right ${wordCount >= MIN_WORDS ? 'text-green-600' : 'text-gray-400'}`}>
              {interpolate(translations.wordCount, { count: String(wordCount), min: String(MIN_WORDS) })}
            </p>
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="self-start bg-black text-white px-10 py-3 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {status === 'submitting' ? translations.submitting : translations.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
