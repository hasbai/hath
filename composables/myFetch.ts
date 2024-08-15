export const myFetch: typeof useFetch = (request, opts?) => {
  return useFetch(request, {
    baseURL: '/rest/v1',
    ...opts,
  })
}
export const $myFetch = (request: any, options?: any) => {
  return $fetch(request, {
    baseURL: '/rest/v1',
    credentials: 'include',
    ...options,
  })
}

export const getSingle = {
  'Accept': 'application/vnd.pgrst.object+json',
}

export const returnSingle = {
  'Accept': 'application/vnd.pgrst.object+json',
  'Prefer': 'return=representation',
}

export const select = {
  blog: '*,tags:tag(*)',
  comment: '*'
}