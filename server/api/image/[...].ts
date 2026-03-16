import {init} from "@immich/sdk";

const API_KEY = process.env.IMMICH_API_KEY
if (!API_KEY) {
  console.error("Missing Immich API KEY")
}

init({baseUrl: "https://photo.x.hath.top:444/api", apiKey: API_KEY!});

export default defineEventHandler((event) => {
  const id = event.context.params?._!
  return d(id)
})