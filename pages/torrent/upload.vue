<template>
  <main>
    <form class="grid gap-4 my-4">
      <label>
        {{ $t('name') }}*
        <!--        <span :data-tip="$t('torrent-title-rule')" class="tooltip tooltip-right">-->
        <!--          <icon name="material-symbols:info"/>-->
        <!--        </span>-->
      </label>
      <input v-model="torrentData.name" :placeholder="$t('torrent-title-rule')"
             class="input input-sm input-bordered w-full"
             name="torrent-name" type="text"/>
      <label>
        {{ $t('subtitle') }}
      </label>
      <input v-model="torrentData.comment" :placeholder="$t('torrent-subtitle-rule')"
             class="input input-sm input-bordered w-full"
             name="torrent-subtitle" type="text"/>
      <label>
        {{ $t('category') }}
      </label>
      <select v-model="torrent.torrent_type"
              class="select select-bordered select-sm w-full" name="torrent-category">
        <option class="hidden" disabled selected value="undefined">---</option>
        <option v-for="i in useAppConfig().torrentTypes" :value="i">
          {{ $t(i) }}
        </option>
      </select>
      <label>{{ $t('description') }}</label>
      <textarea v-model="torrent.text" :placeholder="$t('torrent-text-rule')"
                class="textarea textarea-bordered h-48 w-full"
                name="comment-text-input"
                placeholder="Write something..."/>

      <div class="grid-col-1-2 inline-flex justify-between flex-wrap">
        <span>{{ $t('torrent-size') }}: {{ humanFileSize(torrentData.length) }}</span>
        <span>{{ $t('piece-size') }}: {{ humanFileSize(torrentData.pieceLength) }}</span>
        <span>{{ $t('infohash') }}: {{ torrentData.infoHash }}</span>
      </div>
    </form>
    <div class="upload flex gap-4">
      <div class="flex flex-col flex-1 gap-1">
        <input ref="fileInput" accept="application/x-bittorrent"
               class="file-input file-input-bordered w-full max-w-sm"
               name="torrent-upload" type="file"
               @change="onFileInputChange"/>
        <label class="caption">{{ $t('torrent-upload-tip') }}</label>
      </div>
      <div class="w-full">
        <button :disabled="!validateTorrent()"
                class="btn btn-primary relative w-full max-w-xs"
                @click="onClick">
          <loader :loading="loading">
            {{ $t('upload') }}
          </loader>
        </button>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import {decodeTorrentFile, type TorrentData} from "~/utils/torrent";
import {humanFileSize} from "~/utils";
import {Torrent} from "~/models";

definePageMeta({
  layout: 'torrent'
})
useSeoMeta({
  title: useNuxtApp().$i18n.t('torrent-upload'),
})

const torrentData = reactive({} as TorrentData)
const torrent = reactive(new Torrent({data: torrentData}))

const onFileInputChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length < 1) return
  const result = await decodeTorrentFile(new Uint8Array(await files[0].arrayBuffer()))
  processTorrent(result)
  Object.assign(torrentData, result)
}

const processTorrent = (data: TorrentData) => {
  data.announce = [useRuntimeConfig().public.tracker] // TODO: user passkey
  data.comment = ''
  data.private = true
  data.urlList = []
}

const validateTorrent = () => {
  for (const key of ['name', 'comment', 'infoHash']) {
    if (!torrentData[key] || typeof torrentData[key] !== 'string') {
      return false
    }
    torrentData[key] = torrentData[key].trim()
    if (!torrentData[key]) {
      return false
    }
  }
  return true
}

const loading = ref(false)
const onClick = async () => {
  loading.value = true
  await torrent.upload()
  loading.value = false
}
</script>
<style scoped>
form {
  grid-template-columns: max-content 1fr;
  align-items: center;
}

form label {
  @apply inline-flex items-center gap-1;
}

form label span {
  @apply text-gray-600;
  line-height: 0;
}

.grid-col-1-2 {
  grid-column: 1 / span 2;
}

.upload > div:nth-child(1) {
  flex: 2;
}

.upload > div:nth-child(2) {
  flex: 1;
}
</style>