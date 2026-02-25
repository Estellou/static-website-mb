interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label: string
  name: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
}

export default function Select({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  error,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-black">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors appearance-none bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
