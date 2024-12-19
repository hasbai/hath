<template>
  <div v-if="rating" class="inline-flex gap-2 items-center w-fit">
    <icon class="text-green-600" name="simple-icons:douban" size="1em"></icon>
    {{ rating }}
  </div>
</template>
<script lang="ts" setup>
defineProps<{ rating: number }>()
</script>