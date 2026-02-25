interface InputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  multiline?: boolean
  required?: boolean
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
}

export default function Input({
  label,
  name,
  type = 'text',
  multiline = false,
  required = false,
  placeholder,
  value,
  onChange,
  error,
  hint,
}: InputProps) {
  const baseClass =
    'w-full border border-gray-300 px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors'
  const errorClass = error ? 'border-red-500 focus:border-red-500' : ''

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-black">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={6}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} ${errorClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} ${errorClass}`}
        />
      )}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
