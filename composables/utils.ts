export const backOrHome = () => {
  const router = useRouter()
  if (!history) return router.push('/')
  if (history.length === null || history.state.back === null) return router.push('/')
  return router.back()
}

export const needAuth = () => {
  if (!useSupabaseUser().value) {
    navigateTo('/login')
    throw new Error('Unauthorized')
  }
}

export const isAdmin = () => {
  const user = useSupabaseUser().value
  if (!user) return false
  return user.role === 'admin'
}

export const normalizeStorageSrc = (src: string): string => {
  if (src.startsWith('/')) {
    return useRuntimeConfig().public.supabase.url + src
  } else {
    return src
  }
}