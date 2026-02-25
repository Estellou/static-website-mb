import fr from './fr.json'

export { fr }

export function interpolate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (str, [key, val]) => str.replaceAll(`{${key}}`, val),
    template
  )
}
