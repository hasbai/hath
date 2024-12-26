<template>
  <NuxtRouteAnnouncer/>
  <NuxtLoadingIndicator/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script lang="ts" setup>

const route = useRoute()
const t = useNuxtApp().$i18n.t

useSeoMeta({
  title: t('title'),
  ogTitle: t('title'),
  description: t('description'),
  ogDescription: t('description'),
  ogImage: 'https://www.hath.top/image/pwa-512x512.png',
  twitterCard: 'summary_large_image',
})
useHead({
  titleTemplate: (titleChunk) => {
    let suffix = 'title'
    if (route.path.includes('admin')) suffix = 'admin'
    return titleChunk
        ? `${titleChunk} | ${t(suffix)}`
        : t(suffix)
  }
})
</script>