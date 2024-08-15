<template>
  <div>
    <div class="navbar border-b-1">
      <div class="navbar-start">
        <label class="sm:hidden btn bg-transparent border-0" for="side-bar">
          <Icon name="mdi:menu" size="1.5rem"/>
        </label>
        <nuxt-link :to="localePath('/')"
                   class="btn btn-ghost text-xl mx-4 lg:mx-8 xl:mx-16 2xl:mx-24">
          {{ $t('title') }}
        </nuxt-link>
        <div class="space-x-8 links sm:flex hidden">
          <nuxt-link :to="localePath('/blog')" class="btn btn-link">
            {{ $t('blog') }}
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
    <div class="drawer">
      <input id="side-bar" class="drawer-toggle" type="checkbox"/>
      <div class="w-64 hidden 2xl:block" style="grid-column-start: 3"></div>
      <div class="drawer-content">
        <slot></slot>
        <footer class="h-12 text-center text-sm text-gray-500 mt-36">
          <nuxt-link href="https://icp.gov.moe/?keyword=20241064">
            {{ $t('icp') }}
          </nuxt-link>
          <div>{{ $t('copyright') }}</div>
        </footer>
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
          <li>
            <nuxt-link :to="localePath('/blog')" @click="toggleDrawer">
              {{ $t('blog') }}
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
import SwitchTheme from "~/components/header/SwitchTheme.vue";
import SearchBar from "~/components/header/SearchBar.vue";
import SwitchLocale from "~/components/header/SwitchLocale.vue";

const localePath = useLocalePath()
const toggleDrawer = () => {
  const sideBar = document.getElementById('side-bar') as HTMLInputElement
  sideBar.checked = !sideBar.checked
}
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

.drawer-overlay {
  background: transparent !important;
}

.drawer-side {
  position: absolute;
  height: 100%;
}
</style>