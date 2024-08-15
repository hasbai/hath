<template>
  <div class="flex flex-row gap-4">
    <img :alt="user.email"
         :src="`https://gravatar.com/avatar/${md5(user.email || '')}?d=retro`"
         class="w-12 rounded-full"/>
    <div class="flex flex-col justify-evenly">
      <slot></slot>
      <span>{{ user.email }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {User} from "~/models";
import md5 from "md5";

const props = defineProps<{
  user: User
}>()
</script>