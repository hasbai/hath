<template>
  <dialog id="image_viewer" class="modal overflow-auto"
          @touchend.stop="touchend" @touchmove.stop="touchmove"
          @touchstart.stop="touchstart"
  >
    <div class="modal-box rounded-none p-0">
      <img :src="normalizeStorageSrc(src)" alt="viewing image"/>
    </div>
    <form class="modal-backdrop" method="dialog">
      <button>close</button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
import {normalizeStorageSrc} from "@/composables/utils";

const src = useState('viewingImage', () => '')

let distanceStart: number
const scale = ref(1)
const center = reactive({x: 0, y: 0})

const touchstart = (e: TouchEvent) => {
  const touches = e.touches
  if (touches.length < 2) return
  center.x = (touches[0].clientX + touches[1].clientX) / 2
  center.y = (touches[0].clientY + touches[1].clientY) / 2
  const startX = touches[0].clientX - touches[1].clientX
  const startY = touches[0].clientY - touches[1].clientY
  distanceStart = Math.sqrt(startX ** 2 + startY ** 2) / scale.value
}

const touchmove = (e: TouchEvent) => {
  const touches = e.touches
  if (touches.length < 2) return
  const endX = touches[0].clientX - touches[1].clientX
  const endY = touches[0].clientY - touches[1].clientY
  scale.value = Math.sqrt(endX ** 2 + endY ** 2) / distanceStart
}

const touchend = () => {
  distanceStart = 0
}
</script>

<style>
#image_viewer .modal-box {
  width: max-content;
  height: max-content;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 4rem);
  transform: scale(v-bind(scale));
}
</style>