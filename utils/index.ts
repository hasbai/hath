const colors = [
  'text-neutral-800 dark:text-neutral-600',
  'text-red-800 dark:text-red-600',
  'text-orange-800 dark:text-orange-600',
  'text-amber-800 dark:text-amber-600',
  'text-yellow-800 dark:text-yellow-600',
  'text-lime-800 dark:text-lime-600',
  'text-green-800 dark:text-green-600',
  'text-emerald-800 dark:text-emerald-600',
  'text-teal-800 dark:text-teal-600',
  'text-cyan-800 dark:text-cyan-600',
  'text-sky-800 dark:text-sky-600',
  'text-blue-800 dark:text-blue-600',
  'text-indigo-800 dark:text-indigo-600',
  'text-violet-800 dark:text-violet-600',
  'text-purple-800 dark:text-purple-600',
  'text-fuchsia-800 dark:text-fuchsia-600',
  'text-pink-800 dark:text-pink-600',
  'text-rose-800 dark:text-rose-600',
]
export const hashColor = (s: string): string => {
  if (!s || s.length === 0) return 'text-neutral-800 dark:text-neutral-600'
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash += s.charCodeAt(i)
  }
  return colors[hash % colors.length]
}

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const toJSON = (o: any): string => {
  try {
    if (o.toJSON) {
      return o.toJSON()
    } else {
      return o.toString()
    }
  } catch {
    return ''
  }
}