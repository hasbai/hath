<template>
  <div>
    <navbar></navbar>
    <div class="drawer">
      <input id="side-bar" class="drawer-toggle" type="checkbox"/>
      <div class="drawer-content">
        <slot></slot>
        <page-foot/>
      </div>
      <div class="drawer-side">
        <label class="drawer-overlay bg-transparent" for="side-bar"></label>
        <ul
            class="menu w-64 p-4 mr-4 mb-4 h-fit flex flex-col space-y-2
          leading-loose bg-base-100 rounded-r-3xl shadow-lg border-t-2 border-base-300">
          <li>
            <nuxt-link :to="localePath('/')" @click="toggleDrawer">
              {{ $t('home') }}
            </nuxt-link>
          </li>
          <li v-for="page in pages" :key="page">
            <nuxt-link :to="localePath(`/${page}`)" @click="toggleDrawer">
              {{ $t(page) }}
            </nuxt-link>
          </li>
          <hr class="border-base-200">
          <li class="text-xs text-gray-500">
            {{ $t('copyright') }}
          </li>
        </ul>
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script lang="ts" setup>
import Toast from "@/components/feedback/Toast.vue";
import PageFoot from "~/components/PageFoot.vue";
import Navbar from "~/components/header/Navbar.vue";

const localePath = useLocalePath()
const toggleDrawer = () => {
  const sideBar = document.getElementById('side-bar') as HTMLInputElement
  sideBar.checked = !sideBar.checked
}

const pages = ['blog', 'torrent']
</script>

<style scoped>
.drawer-overlay {
  background: transparent !important;
}

.drawer-side {
  position: absolute;
  height: 100%;
}
</style>