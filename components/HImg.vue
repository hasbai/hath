<template>
  <div class="relative w-full h-full overflow-hidden">
    <client-only>
      <transition name="fade">
        <img v-show="!loading" :alt="<string>attrs.alt" :src="<string>attrs.src"
             class="w-full h-full object-cover"
             @load="onload"
        >
      </transition>
      <loader :loading="loading" class="text-2xl" color/>
    </client-only>
  </div>
</template>
<script lang="ts" setup>
import {useAttrs} from "vue";

const attrs = useAttrs()
const loading = ref(true)
const onload = () => {
  loading.value = false
}
</script>