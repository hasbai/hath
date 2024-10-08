<template>
  <div class="navbar border-b-1">
    <div class="navbar-start">
      <label class="sm:hidden btn bg-transparent border-0" for="side-bar">
        <Icon name="mdi:menu" size="1.5rem"/>
      </label>
      <nuxt-link :to="localePath('/')"
                 class="text-xl btn btn-ghost mx-4 lg:mx-8 xl:mx-16 2xl:mx-24">
        {{ $t('title') }}
      </nuxt-link>
      <div class="space-x-8 links sm:flex hidden">
        <nuxt-link v-for="page in pages" :key="page"
                   :to="localePath(`/${page}`)" class="btn btn-link">
          {{ $t(page) }}
        </nuxt-link>
      </div>
    </div>
    <div class="navbar-center">
    </div>
    <div class="navbar-end">
      <SearchBar/>
      <SwitchLocale/>
      <SwitchTheme class="mx-2"/>
    </div>
  </div>

</template>
<script lang="ts" setup>

import SearchBar from "~/components/header/SearchBar.vue";
import SwitchTheme from "~/components/header/SwitchTheme.vue";
import SwitchLocale from "~/components/header/SwitchLocale.vue";

const localePath = useLocalePath()
const pages = ['blog', 'torrent']
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid;
  border-color: var(--fallback-b2, oklch(var(--b2)));
}

.links {
  position: relative;
  top: 1px;
}

.links > a {
  @apply no-underline hover:underline text-current text-base;
}
</style>