<template>
  <div class="relative flex items-center">
    <input v-model="isDark" class="toggle" name="theme-toggle" type="checkbox"/>
    <Icon v-show="isDark" class="absolute left-1 pointer-events-none"
          name="material-symbols:dark-mode"></Icon>
    <span v-show="!isDark" class="absolute right-0 h-full pointer-events-none text-primary">
      <svg height="24" viewBox="-45 -45 90 90" width="24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="m0 30-15-55.980762L25.980762 15-30 0l55.980762-15L-15 25.980762 0-30l15 55.980762L-25.980762-15 30 0l-55.980762 15L15-25.980762Z"
            fill="currentColor"/>
        <circle fill="none" r="16" stroke="#fff" stroke-width="2"/>
      </svg>
    </span>
  </div>
</template>
<script lang="ts" setup>
const isDark = ref(false)
onMounted(() => {
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  isDark.value = darkModeQuery.matches
  darkModeQuery.addEventListener('change', (e) => {
    isDark.value = e.matches
  })

  const theme = computed(() => isDark.value ? 'dark' : 'light')
  const color = computed(() => isDark.value ? '#282e36' : '#ffffff')
  const toggle = async (value: boolean) => {
    document.documentElement.setAttribute('data-theme', theme.value)
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute('content', color.value)
    })
  }

  watch(isDark, (value) => {
    toggle(value)
  })
  toggle(isDark.value)
})
</script>