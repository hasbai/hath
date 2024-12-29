import fs from 'fs/promises'
import {createHash} from 'node:crypto';

const folderPath = 'public/images'
const images = await fs.readdir(folderPath)
const buffers = images.map((s) =>
  Buffer.from(s.substring(0, 36).replaceAll('-', ''), 'hex')
)
console.log(`Loaded ${images.length} images`)

const hash = createHash('sha256')

function binarySearch(buffer: Buffer) {
  let left = 0
  let right = buffers.length - 1
  let mid = 0
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    const cmp = buffer.compare(buffers[mid], 0, 16, 0, 16)
    if (cmp === 0) {
      return mid
    } else if (cmp < 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return mid
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let index = 0
  if (query.hash) {
    const buffer = hash.copy().update(<string>query.hash).digest()
    index = binarySearch(buffer)
  } else { // random
    index = Math.floor(Math.random() * images.length)
  }

  await sendRedirect(event, `/images/${images[index]}`, 301)
})