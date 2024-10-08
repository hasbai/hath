<template>
  <main>
    <transition-group
        class="relative space-y-6 lg:space-y-8 my-4"
        name="list" tag="div"
    >
      <TorrentCard
          v-for="torrent in torrents"
          :key="torrent.id.toString()"
          :torrent="torrent"
          class="w-full"
      />
    </transition-group>
    <div class="join self-center">
      <input
          aria-label="1"
          checked="checked"
          class="join-item btn btn-square"
          name="options"
          type="radio"/>
      <input aria-label="2" class="join-item btn btn-square" name="options" type="radio"/>
      <input aria-label="3" class="join-item btn btn-square" name="options" type="radio"/>
      <input aria-label="4" class="join-item btn btn-square" name="options" type="radio"/>
    </div>
  </main>

</template>

<script lang="ts" setup>
import TorrentCard from "~/components/torrent/TorrentCard.vue";
import {type OrderField, Torrent} from "~/models";

definePageMeta({
  layout: 'torrent'
})

const torrents = reactive<Torrent[]>([])
let page = ref(0)

const PAGE_SIZE = 20
const order = ref<OrderField>('id')

const supabase = useSupabaseClient()
const toast = useToast()
const load = async (page: number = 0) => {
  let query = supabase.from('torrent').select('*')
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

await load(page.value)
</script>

<style scoped>

</style>