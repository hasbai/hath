<template>
  <div class="img-grid w-full max-w-lg mx-auto">
    <div v-for="(image, i) in images" :key="i">
      <img :alt="`image-${i}`" :src="normalizeStorageSrc(image)"
           tabindex="-1" @click.stop="viewImage"/>
      <button class="absolute hidden top-0 right-0 btn btn-circle btn-sm btn-ghost"
              @click.stop="removeImage(i)">
        <Icon name="mdi:close"/>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useSupabaseClient} from "@/.nuxt/imports";
import {normalizeStorageSrc} from "@/composables/utils";

const {images} = defineProps<{ images?: Array<string> }>()
const gridCols = computed(() => images && Math.min(images.length, 3))
const supabase = useSupabaseClient()
const removeImage = async (index: number) => {
  const uid = images![index].split('/').pop()
  if (!uid) return
  await supabase.storage.from('image').remove([uid])
  images?.splice(index, 1)
}

const viewImage = (e: MouseEvent) => {
  const src = useState('viewingImage')
  src.value = (e.target as HTMLImageElement).src
  const dialog = document.getElementById('image_viewer') as HTMLDialogElement
  dialog.showModal()
}
</script>
<style>
.img-grid {
  display: grid;
  grid-template-columns: repeat(v-bind(gridCols), minmax(0, 8rem));
  grid-auto-rows: 1fr;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.img-grid > div {
  position: relative;
  width: 100%;
  height: 100%;
}

.img-grid img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

dialog .img-grid button {
  display: block;
}
</style>