<template>
  <main class="max-w-screen-xl">
    <table class="table break-word">
      <thead class="text-sm">
      <tr>
        <th>{{ $t('category') }}</th>
        <th>{{ $t('name') }}</th>
        <th>{{ $t('time') }}</th>
        <th>{{ $t('size') }}</th>
        <th>{{ $t('seeders') }}</th>
        <th>{{ $t('leechers') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(torrent, i) in torrents" :key="i">
        <th>
          <icon v-if="torrent.torrent_type===TorrentType.MOVIE" name="noto-v1:movie-camera"/>
          <icon v-else-if="torrent.torrent_type===TorrentType.SERIES" name="noto-v1:television"/>
          <icon v-else-if="torrent.torrent_type===TorrentType.ANIME" name="noto-v1:movie-camera"/>
          <icon v-else-if="torrent.torrent_type===TorrentType.MUSIC" name="noto-v1:musical-score"/>
          <icon v-else-if="torrent.torrent_type===TorrentType.SOFTWARE" name="noto-v1:laptop"/>
          <icon v-else-if="torrent.torrent_type===TorrentType.GAME" name="noto-v1:joystick"/>
          <icon v-else-if="torrent.torrent_type===TorrentType.EBOOK" name="noto-v1:closed-book"/>
        </th>
        <td>
          <div class="w-full inline-flex justify-between items-center">
            <nuxt-link :to="`/torrent/${torrent.id}`" class="link link-hover font-bold">{{
                torrent.title
              }}
            </nuxt-link>
            <icon class="btn-icon shrink-0" name="ic:outline-cloud-download" size="1.5em"></icon>
          </div>
          <div>{{ torrent.description }}</div>
        </td>
        <td>{{ humanTime(torrent.id.getTime()) }}</td>
        <td>{{ humanFileSize(torrent.size) }}</td>
        <td>{{ torrent.seeders }}</td>
        <td>{{ torrent.leechers }}</td>
      </tr>
      </tbody>
    </table>
    <div class="join self-center">
      <input v-for="i in new Array(4).fill(1).map((v, i) => ++i)"
             :aria-label="i" :checked="i===1"
             class="join-item btn btn-square"
             name="options" type="radio" @click="load(i - 1)"/>
    </div>
  </main>

</template>

<script lang="ts" setup>
import {type OrderField, Torrent, TorrentType} from "~/models";
import {humanTime} from "../../utils";

definePageMeta({
  layout: 'torrent'
})
useSeoMeta({
  title: useNuxtApp().$i18n.t('torrent'),
})

const torrents = reactive<Torrent[]>([])

const PAGE_SIZE = 50
const order = ref<OrderField>('id')

const supabase = useSupabaseClient()
const toast = useToast()
const load = async (page: number = 0) => {
  let query = supabase.from('torrents').select()
      .order(order.value, {ascending: false})
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
  const {data, error} = await query
  if (error) {
    console.error(error)
    toast.Error(error.message)
    return
  }
  torrents.length = 0
  torrents.push(...Torrent.fromArray<Torrent>(data))
}

await load(0)
</script>

<style scoped>
tbody tr th span {
  display: block;
  font-size: x-large;
}

.table :where(th, td) {
  padding: 0.5rem;
}
</style>