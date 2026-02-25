import frJson from './fr.json'

// Ensures every leaf value in fr.json is a string — no arrays or non-string primitives allowed.
// satisfies validates without widening the type, so property access retains full inference.
type NestedStringRecord = { [key: string]: string | NestedStringRecord }

export const fr = frJson satisfies NestedStringRecord

export function interpolate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (str, [key, val]) => str.replaceAll(`{${key}}`, val),
    template
  )
}
