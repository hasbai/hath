export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!/tt\d+/.test(id)) return sendError(event, 400, 'Requires IMDB id')

  const r = await fetch(`https://api.douban.com/v2/movie/imdb/${id}?apikey=0ab215a8b1977939201640fa14c66bab`, {
    method: 'POST'
  })
  if (!r.ok) return sendError(event, r.status, await r.text())
  const data = await r.json()
  return {
    doubanID: data.id.sp,
  }
})