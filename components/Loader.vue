<template>
  <transition name="fade">
    <div v-if="loading" class="overlay">
      <div :class="{'color': attrs.color != undefined}" class="loader"></div>
    </div>
    <slot v-else></slot>
  </transition>
</template>
<script lang="ts" setup>
defineProps<{ loading: Boolean }>()
const attrs = useAttrs()
// const red = oklch(53.86% 0.194 26.72);
// const blue = oklch(51.34% 0.16 255.67);
//--l: linear-gradient(var(--r, var(--fallback-r)), var(--b, var(--fallback-b)));

</script>
<style scoped>
.loader {
  position: absolute;
  width: 3em;
  max-height: 60%;
  aspect-ratio: 1;
  --l: linear-gradient(currentColor, currentColor);
  --middle: currentColor;
  --r1: radial-gradient(farthest-side at bottom, var(--middle) 93%, transparent);
  --r2: radial-gradient(farthest-side at top, var(--middle) 93%, transparent);
  background: var(--l), var(--r1), var(--r2),
  var(--l), var(--r1), var(--r2),
  var(--l), var(--r1), var(--r2);
  background-repeat: no-repeat;
  animation: l2 1s infinite alternate;
}

.color {
  --l: linear-gradient(#c62828, #1565c0);
  --middle: #81608d;
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
  z-index: 1;
}

@keyframes l2 {
  0%, 25% {
    background-size: 0.5em 0, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0, 0.5em 0.25em, 0.5em 0.25em;
    background-position: 0 50%, 0 calc(50% - 0.125em), 0 calc(50% + 0.125em), 50% 50%, 50% calc(50% - 0.125em), 50% calc(50% + 0.125em), 100% 50%, 100% calc(50% - 0.125em), 100% calc(50% + 0.125em);
  }
  50% {
    background-size: 0.5em 100%, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0, 0.5em 0.25em, 0.5em 0.25em;
    background-position: 0 50%, 0 calc(0% - 0.125em), 0 calc(100% + 0.125em), 50% 50%, 50% calc(50% - 0.125em), 50% calc(50% + 0.125em), 100% 50%, 100% calc(50% - 0.125em), 100% calc(50% + 0.125em);
  }
  75% {
    background-size: 0.5em 100%, 0.5em 0.25em, 0.5em 0.25em, 0.5em 100%, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0, 0.5em 0.25em, 0.5em 0.25em;
    background-position: 0 50%, 0 calc(0% - 0.125em), 0 calc(100% + 0.125em), 50% 50%, 50% calc(0% - 0.125em), 50% calc(100% + 0.125em), 100% 50%, 100% calc(50% - 0.125em), 100% calc(50% + 0.125em);
  }
  95%, 100% {
    background-size: 0.5em 100%, 0.5em 0.25em, 0.5em 0.25em, 0.5em 100%, 0.5em 0.25em, 0.5em 0.25em, 0.5em 100%, 0.5em 0.25em, 0.5em 0.25em;
    background-position: 0 50%, 0 calc(0% - 0.125em), 0 calc(100% + 0.125em), 50% 50%, 50% calc(0% - 0.125em), 50% calc(100% + 0.125em), 100% 50%, 100% calc(0% - 0.125em), 100% calc(100% + 0.125em);
  }
}
</style>