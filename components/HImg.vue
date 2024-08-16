<template>
  <div class="relative w-full h-full overflow-hidden">
    <client-only>
      <transition name="fade">
        <img v-show="loaded" :alt="attrs.alt" :src="attrs.src"
             class="w-full h-full object-cover"
             @load="onload"
        >
      </transition>
      <transition name="fade">
        <div v-if="!loaded" class="overlay">
          <div class="loader"></div>
        </div>
      </transition>
    </client-only>
  </div>
</template>
<script lang="ts" setup>
import {useAttrs} from "vue";

const attrs = useAttrs()
const loaded = ref(false)
const onload = () => {
  console.log('loaded')
  loaded.value = true
}
</script>

<style scoped>
.loader {
  position: absolute;
  width: 4rem;
  max-width: 100%;
  aspect-ratio: 1;
  --r: oklch(53.86% 0.194 26.72);
  --b: oklch(51.34% 0.16 255.67);
  --fallback-r: #c62828;
  --fallback-b: #1565c0;
  --l: linear-gradient(var(--r, var(--fallback-r)), var(--b, var(--fallback-b)));
  --r1: radial-gradient(farthest-side at bottom, #81608d 93%, transparent);
  --r2: radial-gradient(farthest-side at top, #81608d 93%, transparent);
  background: var(--l), var(--r1), var(--r2),
  var(--l), var(--r1), var(--r2),
  var(--l), var(--r1), var(--r2);
  background-repeat: no-repeat;
  animation: l2 1s infinite alternate;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}

@keyframes l2 {
  0%, 25% {
    background-size: 8px 0, 8px 4px, 8px 4px, 8px 0, 8px 4px, 8px 4px, 8px 0, 8px 4px, 8px 4px;
    background-position: 0 50%, 0 calc(50% - 2px), 0 calc(50% + 2px), 50% 50%, 50% calc(50% - 2px), 50% calc(50% + 2px), 100% 50%, 100% calc(50% - 2px), 100% calc(50% + 2px);
  }
  50% {
    background-size: 8px 100%, 8px 4px, 8px 4px, 8px 0, 8px 4px, 8px 4px, 8px 0, 8px 4px, 8px 4px;
    background-position: 0 50%, 0 calc(0% - 2px), 0 calc(100% + 2px), 50% 50%, 50% calc(50% - 2px), 50% calc(50% + 2px), 100% 50%, 100% calc(50% - 2px), 100% calc(50% + 2px);
  }
  75% {
    background-size: 8px 100%, 8px 4px, 8px 4px, 8px 100%, 8px 4px, 8px 4px, 8px 0, 8px 4px, 8px 4px;
    background-position: 0 50%, 0 calc(0% - 2px), 0 calc(100% + 2px), 50% 50%, 50% calc(0% - 2px), 50% calc(100% + 2px), 100% 50%, 100% calc(50% - 2px), 100% calc(50% + 2px);
  }
  95%, 100% {
    background-size: 8px 100%, 8px 4px, 8px 4px, 8px 100%, 8px 4px, 8px 4px, 8px 100%, 8px 4px, 8px 4px;
    background-position: 0 50%, 0 calc(0% - 2px), 0 calc(100% + 2px), 50% 50%, 50% calc(0% - 2px), 50% calc(100% + 2px), 100% 50%, 100% calc(0% - 2px), 100% calc(100% + 2px);
  }
}
</style>