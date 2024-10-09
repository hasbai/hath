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

export const humanFileSize = (bytes: number): string => {
  if (!bytes) {
    bytes = 0
  }
  const thresh = 1024
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }
  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1
  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1) + ' ' + units[u]
}

export const humanTime = (time: number | Date): string => {
  const now = new Date().getTime()
  if (time instanceof Date) {
    time = time.getTime()
  }
  const diff = (now - time) / 1000
  if (diff < 60) {
    return useNuxtApp().$i18n.t('just now')
  }
  if (diff < 3600) {
    return Math.floor(diff / 60) + ' ' + useNuxtApp().$i18n.t('minutes')
  }
  if (diff < 86400) {
    return Math.floor(diff / 3600) + ' ' + useNuxtApp().$i18n.t('hours')
  }
  if (diff < 2592000) {
    return Math.floor(diff / 86400) + ' ' + useNuxtApp().$i18n.t('days')
  }
  return new Date(time).toLocaleDateString()
}