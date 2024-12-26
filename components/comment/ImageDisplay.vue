<template>
  <div class="img-grid w-full mx-auto">
    <div v-for="(image, i) in images" :key="i">
      <img :alt="`image-${i}`" :src="normalizeStorageSrc(image)"
           tabindex="-1" @click.stop="viewImage"/>
      <button class="absolute hidden top-0 right-0 btn btn-circle btn-sm btn-ghost"
              @click.stop="removeImage(i)">
        <Icon name="mdi:close"/>
      </button>
    </div>
    <div class="hidden justify-center items-center cursor-pointer">
      <Icon name="mdi:add" size="4em"></Icon>
      <input ref="fileInput" accept="image/*"
             class="file-input w-full h-full top-0 left-0 absolute opacity-0"
             multiple name="image-input" type="file"
             @change="onFileInputChange"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useSupabaseClient} from "@/.nuxt/imports";
import {normalizeStorageSrc} from "@/composables/utils";

const {images} = defineProps<{ images: Array<string> }>()
const gridCols = computed(() => {
  switch (images.length + 1) {
    case 1:
      return 1
    case 2:
      return 2
    case 3:
      return 2
    case 4:
      return 2
    default:
      return 3
  }
})
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

const toast = useToast()
const fileInput = ref<HTMLInputElement | null>(null)
const onFileInputChange = async () => {
  const files = fileInput.value?.files
  if (!files) return
  for (let file of files) {
    const uid = await hash(file)
    const {error} = await supabase.storage.from('image').upload(uid, file)
    if (error && (<any>error).statusCode != '409') {
      toast.Error(error.message)
      console.error(error)
    } else {
      images.push(`/storage/v1/object/public/image/${uid}`)
    }
  }
}

const hash = async (file: File) => {
  try {
    const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer())
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replaceAll('+', '-')
        .replaceAll('/', '_')
  } catch (e) {
    console.error('Failed to hash file, use UUID instead. ', e)
    return crypto.randomUUID()
  }
}
</script>
<style>
.img-grid {
  display: grid;
  grid-template-columns: repeat(v-bind(gridCols), 1fr);
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

#edit-blog .img-grid .hidden {
  display: flex;
}
</style>