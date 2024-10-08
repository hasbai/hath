<template>
  <main>
    <input ref="fileInput" accept="application/x-bittorrent" class="file-input w-full max-w-xs"
           name="torrent-upload" type="file"
           @change="onFileInputChange"/>
    <form class="grid gap-4">
      <label>
        {{ $t('name') }}
      </label>
      <input v-model="torrent.name" class="input input-sm input-bordered w-full"
             name="torrent-name" type="text"/>
      <label>
        {{ $t('subtitle') }}
      </label>
      <input v-model="torrent.comment" class="input input-sm input-bordered w-full"
             name="torrent-subtitle" type="text"/>
    </form>

    <table class="table">
      <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      </tbody>
    </table>
  </main>
</template>
<script lang="ts" setup>
import {decodeTorrentFile, type TorrentInfo} from "~/utils/torrent";

definePageMeta({
  layout: 'torrent'
})

const torrent = reactive({} as TorrentInfo)
const onFileInputChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length < 1) return
  const result = await decodeTorrentFile(new Uint8Array(await files[0].arrayBuffer()))
  processTorrent(result)
  Object.assign(torrent, result)
  console.log(torrent)
}

const processTorrent = (info: TorrentInfo) => {
  info.announce = [useRuntimeConfig().public.tracker] // TODO: user passkey
  info.comment = ''
  info.private = true
  info.urlList = []
}
</script>
<style scoped>
form {
  grid-template-columns: max-content 1fr;
  align-items: center;
}
</style>