<template>
  <navbar></navbar>
  <div class="drawer sm:drawer-open">
    <input id="side-bar" class="drawer-toggle" type="checkbox"/>
    <div class="drawer-content">
      <slot></slot>
      <page-foot/>
    </div>
    <div class="drawer-side">
      <label class="drawer-overlay bg-transparent" for="side-bar"></label>
      <ul
          class="menu w-32 p-4 mr-4 mb-4 h-fit flex flex-col gap-2
          leading-loose bg-base-100 rounded-r-3xl shadow-lg border-t-2 border-base-300">
        <li>
          <nuxt-link :to="localePath('/torrent')">
            <icon name="simple-icons:bittorrent"></icon>
            {{ $t('torrent') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('/torrent/upload')">
            <icon name="mdi:cloud-upload"></icon>
            {{ $t('upload') }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import PageFoot from "~/components/PageFoot.vue";
import Navbar from "~/components/header/Navbar.vue";

const localePath = useLocalePath()

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