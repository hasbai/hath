export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!/tt\d+/.test(id)) throw createError({status: 400, message: 'Requires IMDB id'})

  const r = await fetch(
    `https://api.douban.com/v2/movie/imdb/${id}?apikey=0ab215a8b1977939201640fa14c66bab`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }
  )
  if (!r.ok) throw createError({message: await r.text()})
  const data = await r.json()
  return {
    extra: {
      doubanID: data.id.substring(data.id.lastIndexOf('/') + 1, data.id.length),
      doubanRating: data.rating.average,
    },
    description: data.alt_title,
    text: data.summary,
    image: data.image,
  }
})