<template>
  <div class="flex flex-row">
    <div class="flex justify-center items-center text-4xl">
      <icon v-if="torrent.torrent_type===TorrentType.MOVIE" name="noto-v1:movie-camera"/>
      <icon v-else-if="torrent.torrent_type===TorrentType.SERIES" name="noto-v1:television"/>
      <icon v-else-if="torrent.torrent_type===TorrentType.ANIME" name="noto-v1:movie-camera"/>
      <icon v-else-if="torrent.torrent_type===TorrentType.MUSIC" name="noto-v1:musical-score"/>
      <icon v-else-if="torrent.torrent_type===TorrentType.SOFTWARE" name="noto-v1:laptop"/>
      <icon v-else-if="torrent.torrent_type===TorrentType.GAME" name="noto-v1:joystick"/>
      <icon v-else-if="torrent.torrent_type===TorrentType.BOOK" name="noto-v1:closed-book"/>
    </div>
    <div class="flex flex-1">
      <span class="font-bold">{{ torrent.title }}</span><br>
      sadfsdf
    </div>
  </div>
</template>
<script lang="ts" setup>

import {Torrent, TorrentType} from "~/models";

const {torrent} = defineProps<{ torrent: Torrent }>()

</script>

<style scoped>

</style>