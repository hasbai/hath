<template>
  <div :class="hashColor(tag.name)"
       class="tag caret-transparent relative inline-flex items-center">
    <Icon name="mdi:tag" size="1.25em"></Icon>
    &nbsp;{{ tag.name }}
    <nuxt-link :to="`/tag/${tag.name}`" class="absolute w-full h-full"/>
  </div>
</template>

<script lang="ts" setup>
import {type Tag} from "@/models";

const {tag} = defineProps<{ tag: Tag }>()
</script>

<style>
.tag-input .tag a {
  display: none;
}
</style>