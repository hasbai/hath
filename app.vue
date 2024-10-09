<template>
  <NuxtRouteAnnouncer/>
  <NuxtLoadingIndicator/>
  <Toast></Toast>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import Toast from "~/components/feedback/Toast.vue";

const title = '拾遗录'
const description = '观察、思考、反馈'
useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: 'https://www.hath.top/image/pwa-512x512.png',
  twitterCard: 'summary_large_image',
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk && titleChunk != title ? `${titleChunk} - ${title}` : title
  }
})
</script>